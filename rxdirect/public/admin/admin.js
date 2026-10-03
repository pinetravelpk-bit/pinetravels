// RX Direct admin panel. Plain JS, no build step. Talks to server/api.mjs with
// the admin password as a Bearer token (kept in sessionStorage for this tab only).
(function () {
  "use strict";

  var SERVICES = [["cooks","Cooks"],["chefs","Chefs"],["drivers","Drivers"],["maids","Maids"],["helpers","Helpers"],["cleaners","Cleaners"],["security-guards","Security Guards"],["office-boys","Office Boys"],["babysitters-nannies","Babysitters & Nannies"],["gardeners","Gardeners"],["nurses","Nurses"],["caretakers","Caretakers"],["couples","Domestic Couples"],["batman","Batman (Personal Attendant)"],["electricians","Electricians"],["plumbers","Plumbers"],["carpenters","Carpenters"],["painters","Painters"]];
  var CITIES = ["Islamabad","Rawalpindi","Lahore","Karachi","Faisalabad","Multan","Peshawar","Gujranwala"];
  var CHECKS = [["cnic","CNIC"],["address","Address"],["police","Police record"],["references","References"],["medical","Medical"],["interview","Interview"],["skills","Skills check"]];
  var STAFF_STATUS = { pending: "Pending", in_review: "In review", verified: "Verified", rejected: "Rejected", suspended: "Suspended" };
  var APP_STATUS = { new: "New", shortlisted: "Shortlisted", interview: "Interview", hired: "Hired", rejected: "Rejected" };
  var JOB_TYPES = { "full-time": "Full-time", "part-time": "Part-time", "live-in": "Live-in", "live-out": "Live-out", contract: "Contract" };
  var DOCS = [["photo","Photo"],["cnicFront","CNIC front"],["cnicBack","CNIC back"],["police","Police certificate"],["medical","Medical certificate"],["other","Other"]];
  var KEY = "rxdirect-admin";
  var VIEWS = { dashboard: "Dashboard", staff: "Staff verification", jobs: "Jobs", applications: "Applications", leads: "Leads", team: "Team", comments: "Blog comments" };

  var pw = sessionStorage.getItem(KEY) || "";
  var $ = function (id) { return document.getElementById(id); };
  var blobUrls = [];

  // ---------- helpers ----------
  function esc(s) { var d = document.createElement("div"); d.textContent = s == null ? "" : String(s); return d.innerHTML; }
  function when(iso) { return iso ? new Date(iso).toLocaleString("en-PK", { timeZone: "Asia/Karachi", dateStyle: "medium", timeStyle: "short" }) : "—"; }
  function day(iso) { return iso ? new Date(iso).toLocaleDateString("en-PK", { timeZone: "Asia/Karachi", dateStyle: "medium" }) : "—"; }
  function service(slug) { var s = SERVICES.find(function (x) { return x[0] === slug; }); return s ? s[1] : slug || "—"; }
  function badge(status, labels) { return '<span class="badge b-' + esc(status) + '">' + esc((labels && labels[status]) || status) + "</span>"; }
  function options(map, selected) { return Object.keys(map).map(function (k) { return '<option value="' + esc(k) + '"' + (k === selected ? " selected" : "") + ">" + esc(map[k]) + "</option>"; }).join(""); }
  function wa(phone) { var d = String(phone || "").replace(/\D/g, ""); if (d[0] === "0") d = "92" + d.slice(1); return "https://wa.me/" + d; }
  function toast(msg, isError) { var t = $("toast"); t.textContent = msg; t.className = "toast" + (isError ? " error" : ""); t.hidden = false; clearTimeout(toast.timer); toast.timer = setTimeout(function () { t.hidden = true; }, 3200); }

  function api(path, opts) {
    opts = opts || {};
    opts.headers = Object.assign({ Authorization: "Bearer " + pw }, opts.headers || {});
    if (opts.json !== undefined) { opts.body = JSON.stringify(opts.json); opts.headers["Content-Type"] = "application/json"; delete opts.json; }
    return fetch(path, opts).then(function (r) {
      if (r.status === 401) { showLogin("Wrong password."); throw new Error("401"); }
      if (r.status === 429) { showLogin("Too many wrong passwords. Try again in 15 minutes."); throw new Error("429"); }
      return r.json().catch(function () { return {}; }).then(function (data) {
        if (!r.ok) throw new Error(data.error || "Request failed (" + r.status + ")");
        return data;
      });
    });
  }
  function onError(e) { if (e.message !== "401" && e.message !== "429") toast(e.message, true); }

  // Private documents need the auth header, so they're fetched and shown as blob URLs.
  function fileUrl(name) {
    return fetch("/api/admin/files/" + encodeURIComponent(name), { headers: { Authorization: "Bearer " + pw } })
      .then(function (r) { if (!r.ok) throw new Error("File not found"); return r.blob(); })
      .then(function (b) { var u = URL.createObjectURL(b); blobUrls.push(u); return u; });
  }
  function openFile(name) { var w = window.open("", "_blank"); fileUrl(name).then(function (u) { if (w) w.location = u; }).catch(function (e) { if (w) w.close(); onError(e); }); }

  // ---------- auth & layout ----------
  function showLogin(msg) {
    sessionStorage.removeItem(KEY); pw = "";
    $("app").hidden = true; $("login").hidden = false; $("login-err").textContent = msg || ""; $("pw").focus();
  }
  function showApp() { $("login").hidden = true; $("app").hidden = false; route(); refreshCounts(); }

  $("login").onsubmit = function (e) {
    e.preventDefault(); pw = $("pw").value;
    api("/api/admin/summary").then(function () { sessionStorage.setItem(KEY, pw); $("pw").value = ""; showApp(); }).catch(onError);
  };
  $("logout").onclick = function () { showLogin(""); };
  $("menu-toggle").onclick = function () { document.querySelector(".sidebar").classList.toggle("open"); };
  $("modal-close").onclick = closeModal;
  $("modal").addEventListener("click", function (e) { if (e.target === $("modal")) closeModal(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !$("modal").hidden) closeModal(); });
  window.addEventListener("hashchange", route);
  document.querySelectorAll("#nav a").forEach(function (a) { a.onclick = function () { location.hash = a.dataset.view; document.querySelector(".sidebar").classList.remove("open"); }; });

  function openModal(html) { $("modal-body").innerHTML = html; $("modal").hidden = false; document.body.style.overflow = "hidden"; }
  function closeModal() { $("modal").hidden = true; $("modal-body").innerHTML = ""; document.body.style.overflow = ""; blobUrls.forEach(URL.revokeObjectURL); blobUrls = []; }

  function refreshCounts() {
    api("/api/admin/summary").then(function (s) {
      setCount("staffPending", (s.staff.pending || 0) + (s.staff.in_review || 0));
      setCount("appsNew", s.applications.new || 0);
      setCount("commentsPending", s.comments.pending || 0);
      setCount("leadsNew", (s.leads && s.leads.new) || 0);
    }).catch(function () {});
  }
  function setCount(key, n) { var el = document.querySelector('[data-count="' + key + '"]'); if (el) el.textContent = n ? String(n) : ""; }

  function route() {
    var view = (location.hash || "#dashboard").slice(1);
    if (!VIEWS[view]) view = "dashboard";
    document.querySelectorAll("#nav a").forEach(function (a) { a.classList.toggle("active", a.dataset.view === view); });
    $("view-title").textContent = VIEWS[view];
    $("view-actions").innerHTML = "";
    $("view").innerHTML = '<p class="muted">Loading…</p>';
    ({ dashboard: dashboard, staff: staffView, jobs: jobsView, applications: appsView, leads: leadsView, team: teamView, comments: commentsView })[view]();
  }

  // ---------- dashboard ----------
  function dashboard() {
    api("/api/admin/summary").then(function (s) {
      var cards = [
        ["staff", "Staff applications", s.staff.total, (s.staff.pending || 0) + " pending · " + (s.staff.in_review || 0) + " in review · " + (s.staff.verified || 0) + " verified"],
        ["applications", "Job applications", s.applications.total, (s.applications.new || 0) + " new · " + (s.applications.hired || 0) + " hired"],
        ["jobs", "Jobs", s.jobs.total, (s.jobs.open || 0) + " open · " + (s.jobs.closed || 0) + " closed"],
        ["leads", "Leads", s.leads.total, (s.leads.new || 0) + " new · " + (s.leads.contacted || 0) + " contacted · " + (s.leads.placed || 0) + " placed"],
        ["team", "Team members", s.team, "Shown on /team"],
        ["comments", "Blog comments", s.comments.total, (s.comments.pending || 0) + " waiting for approval"],
      ];
      $("view").innerHTML = '<div class="cards">' + cards.map(function (c) {
        return '<div class="card stat" data-go="' + c[0] + '"><b>' + esc(c[2]) + "</b><span>" + esc(c[1]) + "</span><small>" + esc(c[3]) + "</small></div>";
      }).join("") + "</div>";
      $("view").querySelectorAll("[data-go]").forEach(function (el) { el.onclick = function () { location.hash = el.dataset.go; }; });
    }).catch(onError);
  }

  // ---------- staff verification ----------
  var staffFilter = { q: "", status: "" };
  function staffView() {
    api("/api/admin/staff").then(function (list) {
      $("view").innerHTML =
        '<div class="toolbar"><input id="sq" placeholder="Search name, phone, CNIC, ref…" value="' + esc(staffFilter.q) + '">' +
        '<select id="ss"><option value="">All statuses</option>' + options(STAFF_STATUS, staffFilter.status) + "</select></div><div id=\"staff-table\"></div>";
      var draw = function () {
        var q = staffFilter.q.toLowerCase();
        var rows = list.filter(function (s) {
          return (!staffFilter.status || s.status === staffFilter.status) &&
            (!q || [s.name, s.phone, s.ref, s.verifiedId, s.city, service(s.role)].join(" ").toLowerCase().indexOf(q) >= 0);
        });
        $("staff-table").innerHTML = rows.length ? '<div class="table-wrap"><table><thead><tr><th>Name</th><th>Work</th><th>City</th><th>Phone</th><th>Checks</th><th>Status</th><th>Applied</th></tr></thead><tbody>' +
          rows.map(function (s) {
            return '<tr class="click" data-id="' + esc(s.id) + '"><td><b>' + esc(s.name) + '</b><br><span class="muted mono">' + esc(s.verifiedId || s.ref) + "</span></td><td>" + esc(service(s.role)) + "</td><td>" + esc(s.city) + "</td><td>" + esc(s.phone) + "</td><td>" + esc(s.progress) + "</td><td>" + badge(s.status, STAFF_STATUS) + "</td><td>" + day(s.createdAt) + "</td></tr>";
          }).join("") + "</tbody></table></div>" : '<div class="empty">No staff applications' + (q || staffFilter.status ? " match this filter" : " yet. Share /staff/register with your candidates.") + "</div>";
        $("staff-table").querySelectorAll("tr[data-id]").forEach(function (tr) { tr.onclick = function () { staffDetail(tr.dataset.id); }; });
      };
      $("sq").oninput = function () { staffFilter.q = this.value; draw(); };
      $("ss").onchange = function () { staffFilter.status = this.value; draw(); };
      draw();
    }).catch(onError);
  }

  function staffDetail(id) {
    api("/api/admin/staff/" + id).then(function (s) {
      var refs = (s.references || []).map(function (r) { return "<li>" + esc(r.name) + " · " + esc(r.phone) + (r.relation ? " (" + esc(r.relation) + ")" : "") + "</li>"; }).join("") || "<li class=muted>None given</li>";
      openModal(
        '<div class="head-row"><div id="sd-photo"></div><div><h2>' + esc(s.name) + "</h2><p class=muted>" + esc(service(s.role)) + " · " + esc(s.city) + ' · <span class="mono">' + esc(s.ref) + "</span></p>" +
          badge(s.status, STAFF_STATUS) + (s.verifiedId ? ' <span class="badge b-verified mono">' + esc(s.verifiedId) + "</span>" : "") + "</div></div>" +
        '<div class="grid2"><div class="card"><p class="section-title" style="margin-top:0">Details</p><dl class="info">' +
          row("Father/husband", s.fatherName) + row("CNIC", s.cnic) + row("Phone", '<a href="' + wa(s.phone) + '" target="_blank" rel="noopener">' + esc(s.phone) + " (WhatsApp)</a>", true) +
          row("Gender", s.gender) + row("Date of birth", s.dob) + row("Address", s.address) + row("Experience", s.experience ? s.experience + " years" : "") +
          row("Languages", s.languages) + row("Availability", s.availability) + row("Expected salary", s.expectedSalary) + row("Applied", when(s.createdAt)) +
          (s.verifiedAt ? row("Verified on", when(s.verifiedAt)) : "") + "</dl>" +
          (s.about ? '<p class="section-title">About</p><p style="white-space:pre-wrap">' + esc(s.about) + "</p>" : "") +
          '<p class="section-title">References</p><ul>' + refs + "</ul></div>" +
        '<div class="card"><p class="section-title" style="margin-top:0">Documents</p><div class="docs">' +
          DOCS.map(function (d) {
            var f = s.docs && s.docs[d[0]];
            return f ? '<div class="doc"><div class="thumb" data-file="' + esc(f.file) + '" data-type="' + esc(f.type) + '">' + (f.type.indexOf("image/") === 0 ? "…" : "📄 PDF") + "</div>" + esc(d[1]) + "</div>" : '<div class="doc missing"><div class="thumb">—</div>' + esc(d[1]) + "</div>";
          }).join("") + "</div>" +
          '<p class="section-title">Admin notes</p><textarea id="sd-notes" rows="4" placeholder="Internal notes (not shown to staff)">' + esc(s.adminNotes) + "</textarea></div></div>" +
        '<p class="section-title">Verification checklist</p><div class="checks">' +
          CHECKS.map(function (c) {
            var v = (s.checks && s.checks[c[0]]) || { status: "pending", note: "" };
            return '<div class="check"><b>' + esc(c[1]) + '</b><select data-check="' + c[0] + '">' + options({ pending: "Pending", passed: "Passed", failed: "Failed" }, v.status) +
              '</select><input data-note="' + c[0] + '" placeholder="Note (e.g. verified with NADRA)" value="' + esc(v.note) + '"></div>';
          }).join("") + "</div>" +
        '<div class="actions"><button class="btn primary" id="sd-save">Save checks & notes</button>' +
          '<button class="btn warn" data-status="in_review">Mark in review</button>' +
          '<button class="btn success" data-status="verified">Approve & verify</button>' +
          '<button class="btn danger" data-status="rejected">Reject</button>' +
          (s.status === "verified" ? '<button class="btn danger" data-status="suspended">Suspend</button><button class="btn" id="sd-card">Print ID card</button>' : "") +
          '<button class="btn danger" id="sd-delete" style="margin-left:auto">Delete application</button></div><div id="sd-card-wrap"></div>'
      );

      // load thumbnails
      document.querySelectorAll("#modal-body .thumb[data-file]").forEach(function (el) {
        if (el.dataset.type.indexOf("image/") === 0) fileUrl(el.dataset.file).then(function (u) { el.innerHTML = '<img src="' + u + '" alt="">'; }).catch(function () { el.textContent = "Missing"; });
        el.onclick = function () { openFile(el.dataset.file); };
      });
      if (s.docs && s.docs.photo) fileUrl(s.docs.photo.file).then(function (u) { $("sd-photo").innerHTML = '<img src="' + u + '" alt="">'; }).catch(function () {});

      var collect = function () {
        var checks = {};
        CHECKS.forEach(function (c) {
          checks[c[0]] = { status: document.querySelector('[data-check="' + c[0] + '"]').value, note: document.querySelector('[data-note="' + c[0] + '"]').value };
        });
        return { checks: checks, adminNotes: $("sd-notes").value };
      };
      var save = function (extra) {
        return api("/api/admin/staff/" + id, { method: "PATCH", json: Object.assign(collect(), extra || {}) }).then(function (updated) {
          toast(extra && extra.status ? "Status: " + STAFF_STATUS[updated.status] + (updated.verifiedId ? " · " + updated.verifiedId : "") : "Saved");
          refreshCounts(); staffDetail(id); if (location.hash === "#staff" || !location.hash) staffView();
        }).catch(onError);
      };
      $("sd-save").onclick = function () { save(); };
      document.querySelectorAll("#modal-body [data-status]").forEach(function (b) {
        b.onclick = function () {
          var st = b.dataset.status;
          if (st === "verified") {
            var pending = CHECKS.filter(function (c) { return document.querySelector('[data-check="' + c[0] + '"]').value !== "passed"; });
            if (pending.length && !confirm("These checks are not marked Passed: " + pending.map(function (c) { return c[1]; }).join(", ") + ".\nVerify anyway?")) return;
          }
          if ((st === "rejected" || st === "suspended") && !confirm(STAFF_STATUS[st] + " this application?")) return;
          save({ status: st });
        };
      });
      $("sd-delete").onclick = function () {
        if (!confirm("Delete this application and all its documents permanently?")) return;
        api("/api/admin/staff/" + id, { method: "DELETE" }).then(function () { toast("Deleted"); closeModal(); refreshCounts(); staffView(); }).catch(onError);
      };
      if ($("sd-card")) $("sd-card").onclick = function () {
        var photo = document.querySelector("#sd-photo img");
        $("sd-card-wrap").innerHTML = '<p class="section-title">ID card preview</p><div class="idcard"><div class="top">RX<span>/</span> DIRECT <span>VERIFIED STAFF</span></div><div class="body">' +
          (photo ? '<img src="' + photo.src + '" alt="">' : "<img alt=\"\">") + "<div><b>" + esc(s.name) + "</b><br><span class=muted>" + esc(service(s.role)) + " · " + esc(s.city) + '</span><div class="vid">' + esc(s.verifiedId) +
          "</div><small class=muted>CNIC " + esc(String(s.cnic).replace(/^(\d{5})-\d{7}/, "$1-*******")) + "<br>Verified " + day(s.verifiedAt) + "<br>rxdirect.pk/staff/status</small></div></div></div>";
        setTimeout(function () { window.print(); }, 300);
      };
    }).catch(onError);
  }
  function row(label, value, raw) { return value ? "<dt>" + esc(label) + "</dt><dd>" + (raw ? value : esc(value)) + "</dd>" : ""; }

  // ---------- jobs ----------
  function jobsView() {
    $("view-actions").innerHTML = '<button class="btn primary" id="new-job">+ New job</button>';
    $("new-job").onclick = function () { jobForm(null); };
    api("/api/admin/jobs").then(function (list) {
      $("view").innerHTML = list.length ? '<div class="table-wrap"><table><thead><tr><th>Job</th><th>Category</th><th>City</th><th>Type</th><th>Applications</th><th>Status</th><th></th></tr></thead><tbody>' +
        list.map(function (j) {
          return "<tr><td><b>" + esc(j.title) + "</b><br><span class=muted>" + esc(j.salary) + "</span></td><td>" + esc(service(j.category)) + "</td><td>" + esc(j.city) + "</td><td>" + esc(JOB_TYPES[j.type] || j.type) +
            '</td><td><a href="#applications" data-job="' + esc(j.id) + '">' + j.applications + "</a></td><td>" + badge(j.status) + '</td><td style="white-space:nowrap"><button class="btn sm" data-edit="' + esc(j.id) + '">Edit</button> <button class="btn sm ' + (j.status === "open" ? "warn" : "success") + '" data-toggle="' + esc(j.id) + '">' + (j.status === "open" ? "Close" : "Reopen") + '</button> <button class="btn sm danger" data-del="' + esc(j.id) + '">Delete</button></td></tr>';
        }).join("") + "</tbody></table></div>" : '<div class="empty">No jobs yet. Click “New job” to post the first one; it appears on /jobs straight away.</div>';
      var byId = function (id) { return list.find(function (j) { return j.id === id; }); };
      $("view").querySelectorAll("[data-edit]").forEach(function (b) { b.onclick = function () { jobForm(byId(b.dataset.edit)); }; });
      $("view").querySelectorAll("[data-job]").forEach(function (a) { a.onclick = function () { appFilter.job = a.dataset.job; }; });
      $("view").querySelectorAll("[data-toggle]").forEach(function (b) {
        b.onclick = function () { var j = byId(b.dataset.toggle); api("/api/admin/jobs/" + j.id, { method: "PATCH", json: { status: j.status === "open" ? "closed" : "open" } }).then(jobsView).catch(onError); };
      });
      $("view").querySelectorAll("[data-del]").forEach(function (b) {
        b.onclick = function () { if (confirm("Delete this job? Its applications are kept.")) api("/api/admin/jobs/" + b.dataset.del, { method: "DELETE" }).then(jobsView).catch(onError); };
      });
    }).catch(onError);
  }
  function jobForm(job) {
    job = job || { type: "full-time", status: "open", requirements: [] };
    openModal('<h2>' + (job.id ? "Edit job" : "New job") + '</h2><form id="job-form" class="grid2" style="margin-top:16px">' +
      '<label class="span2">Job title *<input name="title" required maxlength="120" value="' + esc(job.title) + '" placeholder="e.g. Experienced cook for family of 5"></label>' +
      '<label>Category<select name="category"><option value="">—</option>' + SERVICES.map(function (s) { return '<option value="' + s[0] + '"' + (s[0] === job.category ? " selected" : "") + ">" + esc(s[1]) + "</option>"; }).join("") + "</select></label>" +
      '<label>City<input name="city" list="cities" value="' + esc(job.city) + '"><datalist id="cities">' + CITIES.map(function (c) { return "<option>" + c + "</option>"; }).join("") + "</datalist></label>" +
      '<label>Type<select name="type">' + options(JOB_TYPES, job.type) + "</select></label>" +
      '<label>Salary<input name="salary" maxlength="80" value="' + esc(job.salary) + '" placeholder="PKR 40,000 / month"></label>' +
      '<label class="span2">Description<textarea name="description" rows="5">' + esc(job.description) + "</textarea></label>" +
      '<label class="span2">Requirements (one per line)<textarea name="requirements" rows="4">' + esc((job.requirements || []).join("\n")) + "</textarea></label>" +
      '<label>Status<select name="status">' + options({ open: "Open (shown on website)", closed: "Closed (hidden)" }, job.status) + "</select></label>" +
      '<div class="span2 actions"><button class="btn primary">Save job</button></div></form>');
    $("job-form").onsubmit = function (e) {
      e.preventDefault();
      var data = Object.fromEntries(new FormData(e.target).entries());
      api(job.id ? "/api/admin/jobs/" + job.id : "/api/admin/jobs", { method: job.id ? "PATCH" : "POST", json: data })
        .then(function () { toast("Job saved"); closeModal(); jobsView(); }).catch(onError);
    };
  }

  // ---------- applications ----------
  var appFilter = { q: "", status: "", job: "" };
  function appsView() {
    Promise.all([api("/api/admin/applications"), api("/api/admin/jobs")]).then(function (res) {
      var list = res[0], jobs = res[1];
      $("view").innerHTML = '<div class="toolbar"><input id="aq" placeholder="Search name, phone, ref…" value="' + esc(appFilter.q) + '">' +
        '<select id="aj"><option value="">All jobs</option><option value="general"' + (appFilter.job === "general" ? " selected" : "") + ">General applications</option>" +
        jobs.map(function (j) { return '<option value="' + esc(j.id) + '"' + (appFilter.job === j.id ? " selected" : "") + ">" + esc(j.title) + "</option>"; }).join("") + "</select>" +
        '<select id="as"><option value="">All statuses</option>' + options(APP_STATUS, appFilter.status) + '</select></div><div id="apps"></div>';
      var draw = function () {
        var q = appFilter.q.toLowerCase();
        var rows = list.filter(function (a) {
          return (!appFilter.status || a.status === appFilter.status) && (!appFilter.job || a.jobId === appFilter.job) &&
            (!q || [a.name, a.phone, a.ref, a.city, a.jobTitle].join(" ").toLowerCase().indexOf(q) >= 0);
        });
        $("apps").innerHTML = rows.length ? rows.map(function (a) {
          return '<div class="card" style="margin-bottom:10px"><div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap"><div><b>' + esc(a.name) + "</b> · " + esc(a.phone) +
            ' <span class="muted mono">' + esc(a.ref) + "</span><br><span class=muted>" + esc(a.jobTitle) + (a.role ? " · " + esc(service(a.role)) : "") + (a.city ? " · " + esc(a.city) : "") +
            (a.experience ? " · " + esc(a.experience) + " yrs" : "") + (a.cnic ? " · CNIC " + esc(a.cnic) : "") + " · " + when(a.createdAt) + "</span></div>" + badge(a.status, APP_STATUS) + "</div>" +
            (a.message ? '<p style="white-space:pre-wrap">' + esc(a.message) + "</p>" : "") +
            '<div class="actions" style="margin-top:10px"><select data-st="' + esc(a.id) + '" style="width:auto">' + options(APP_STATUS, a.status) + "</select>" +
            '<input data-notes="' + esc(a.id) + '" placeholder="Notes" value="' + esc(a.notes) + '" style="flex:1;min-width:160px">' +
            '<button class="btn sm primary" data-save="' + esc(a.id) + '">Save</button>' +
            '<a class="btn sm success" target="_blank" rel="noopener" href="' + wa(a.phone) + '">WhatsApp</a>' +
            (a.cv ? '<button class="btn sm" data-cv="' + esc(a.cv.file) + '">Open CV</button>' : "") +
            '<button class="btn sm danger" data-del="' + esc(a.id) + '">Delete</button></div></div>';
        }).join("") : '<div class="empty">No applications' + (q || appFilter.status || appFilter.job ? " match this filter." : " yet.") + "</div>";
        $("apps").querySelectorAll("[data-save]").forEach(function (b) {
          b.onclick = function () {
            var id = b.dataset.save;
            api("/api/admin/applications/" + id, { method: "PATCH", json: { status: document.querySelector('[data-st="' + id + '"]').value, notes: document.querySelector('[data-notes="' + id + '"]').value } })
              .then(function () { toast("Saved"); refreshCounts(); appsView(); }).catch(onError);
          };
        });
        $("apps").querySelectorAll("[data-cv]").forEach(function (b) { b.onclick = function () { openFile(b.dataset.cv); }; });
        $("apps").querySelectorAll("[data-del]").forEach(function (b) {
          b.onclick = function () { if (confirm("Delete this application and its CV?")) api("/api/admin/applications/" + b.dataset.del, { method: "DELETE" }).then(function () { refreshCounts(); appsView(); }).catch(onError); };
        });
      };
      $("aq").oninput = function () { appFilter.q = this.value; draw(); };
      $("aj").onchange = function () { appFilter.job = this.value; draw(); };
      $("as").onchange = function () { appFilter.status = this.value; draw(); };
      draw();
    }).catch(onError);
  }

  // ---------- leads ----------
  var LEAD_STATUS = { new: "New", contacted: "Contacted", in_progress: "In progress", shortlist_sent: "Shortlist sent", placed: "Placed", closed: "Closed", spam: "Spam" };
  var leadFilter = { q: "", status: "" };
  // Older leads have no status/source fields; blog leads kept the post in the message.
  function normLead(l) {
    l = Object.assign({}, l);
    l.status = l.status || "new";
    if (!l.source && l.message) {
      var m = l.message.match(/\n*\(Sent from blog post: ([\s\S]*?)[,–\-]\s*(\/blog\/[^\s)]+)\)\s*$/);
      if (m) { l.source = "Blog post: " + m[1].trim(); l.sourceUrl = m[2]; l.message = l.message.slice(0, m.index).trim(); }
    }
    if (!l.source) l.source = "Contact page";
    return l;
  }
  function tel(phone) { return "tel:" + String(phone || "").replace(/[^\d+]/g, ""); }
  function leadsView() {
    api("/.netlify/functions/manage-leads").then(function (raw) {
      var list = raw.map(normLead);
      var counts = list.reduce(function (a, l) { a[l.status] = (a[l.status] || 0) + 1; return a; }, {});
      $("view").innerHTML =
        '<div class="tabs">' + [["", "All", list.length]].concat(Object.keys(LEAD_STATUS).map(function (k) { return [k, LEAD_STATUS[k], counts[k] || 0]; })).map(function (t) {
          return '<button class="tab' + (leadFilter.status === t[0] ? " active" : "") + '" data-tab="' + t[0] + '">' + esc(t[1]) + " <b>" + t[2] + "</b></button>";
        }).join("") + "</div>" +
        '<div class="toolbar"><input id="lq" placeholder="Search name, phone, city, service, ref…" value="' + esc(leadFilter.q) + '"></div><div id="leads"></div>';
      var draw = function () {
        var q = leadFilter.q.toLowerCase();
        var rows = list.filter(function (l) {
          return (!leadFilter.status || l.status === leadFilter.status) &&
            (!q || [l.name, l.phone, l.email, l.city, l.service, l.ref, l.source, l.message].join(" ").toLowerCase().indexOf(q) >= 0);
        });
        $("leads").innerHTML = rows.length ? rows.map(function (l) {
          var src = l.sourceUrl ? '<a href="' + esc(l.sourceUrl) + '" target="_blank" rel="noopener">' + esc(l.source) + " ↗</a>" : esc(l.source);
          return '<div class="lead card">' +
            '<div class="lead-head"><div><b class="lead-name">' + esc(l.name) + "</b>" + (l.ref ? ' <span class="muted mono">' + esc(l.ref) + "</span>" : "") +
              '<div class="muted">Received ' + when(l.createdAt) + (l.updatedAt ? " · updated " + when(l.updatedAt) : "") + "</div></div>" + badge(l.status, LEAD_STATUS) + "</div>" +
            '<div class="lead-grid">' +
              '<div class="f"><span>Phone</span><b dir="ltr">' + esc(l.phone) + "</b></div>" +
              (l.email ? '<div class="f"><span>Email</span><b>' + esc(l.email) + "</b></div>" : "") +
              '<div class="f"><span>Staff needed</span><b>' + esc(l.service || "Not specified") + "</b></div>" +
              '<div class="f"><span>City</span><b>' + esc(l.city || "Not specified") + "</b></div>" +
              '<div class="f wide"><span>Source</span><b>' + src + "</b></div>" +
            "</div>" +
            (l.message ? '<div class="lead-msg"><span>Message</span><p>' + esc(l.message) + "</p></div>" : "") +
            '<div class="lead-actions"><select data-st="' + esc(l.id) + '">' + options(LEAD_STATUS, l.status) + "</select>" +
              '<input data-notes="' + esc(l.id) + '" placeholder="Internal notes (e.g. called, sent 3 cooks)" value="' + esc(l.notes) + '">' +
              '<button class="btn sm primary" data-save="' + esc(l.id) + '">Save</button>' +
              '<a class="btn sm" href="' + tel(l.phone) + '">Call</a>' +
              '<a class="btn sm success" target="_blank" rel="noopener" href="' + wa(l.phone) + '">WhatsApp</a>' +
              '<button class="btn sm danger" data-del="' + esc(l.id) + '">Delete</button></div>' +
          "</div>";
        }).join("") : '<div class="empty">No leads' + (q || leadFilter.status ? " match this filter." : " yet.") + "</div>";
        $("leads").querySelectorAll("[data-save]").forEach(function (b) {
          b.onclick = function () {
            var id = b.dataset.save;
            api("/api/admin/leads/" + id, { method: "PATCH", json: { status: document.querySelector('[data-st="' + id + '"]').value, notes: document.querySelector('[data-notes="' + id + '"]').value } })
              .then(function () { toast("Lead updated"); refreshCounts(); leadsView(); }).catch(onError);
          };
        });
        $("leads").querySelectorAll("[data-del]").forEach(function (b) {
          b.onclick = function () { if (confirm("Delete this lead?")) api("/.netlify/functions/manage-leads", { method: "POST", json: { id: b.dataset.del } }).then(function () { refreshCounts(); leadsView(); }).catch(onError); };
        });
      };
      $("view").querySelectorAll("[data-tab]").forEach(function (b) { b.onclick = function () { leadFilter.status = b.dataset.tab; leadsView(); }; });
      $("lq").oninput = function () { leadFilter.q = this.value; draw(); };
      draw();
    }).catch(onError);
  }

  // ---------- team ----------
  function teamView() {
    $("view-actions").innerHTML = '<button class="btn primary" id="new-member">+ Add member</button>';
    $("new-member").onclick = function () { teamForm(null); };
    api("/api/admin/team").then(function (team) {
      $("view").innerHTML = team.length ? '<div class="table-wrap"><table><thead><tr><th></th><th>Name</th><th>Role</th><th>Order</th><th>Shown</th><th></th></tr></thead><tbody>' +
        team.map(function (m) {
          return "<tr><td>" + (m.photo ? '<img class="avatar" src="/api/files/public/' + esc(m.photo.file) + '" alt="">' : '<span class="avatar">' + esc(m.name[0]) + "</span>") +
            "</td><td><b>" + esc(m.name) + "</b></td><td>" + esc(m.role) + "</td><td>" + esc(m.order) + "</td><td>" + (m.visible === false ? "Hidden" : "Yes") +
            '</td><td style="white-space:nowrap"><button class="btn sm" data-edit="' + esc(m.id) + '">Edit</button> <button class="btn sm danger" data-del="' + esc(m.id) + '">Delete</button></td></tr>';
        }).join("") + "</tbody></table></div>" : '<div class="empty">No team members yet. Add your team; they appear on /team.</div>';
      $("view").querySelectorAll("[data-edit]").forEach(function (b) { b.onclick = function () { teamForm(team.find(function (m) { return m.id === b.dataset.edit; })); }; });
      $("view").querySelectorAll("[data-del]").forEach(function (b) {
        b.onclick = function () { if (confirm("Remove this team member?")) api("/api/admin/team/" + b.dataset.del, { method: "DELETE" }).then(teamView).catch(onError); };
      });
    }).catch(onError);
  }
  function teamForm(m) {
    m = m || { visible: true, order: 0 };
    openModal("<h2>" + (m.id ? "Edit team member" : "Add team member") + '</h2><form id="team-form" class="grid2" style="margin-top:16px">' +
      '<label>Name *<input name="name" required maxlength="80" value="' + esc(m.name) + '"></label>' +
      '<label>Role / title<input name="role" maxlength="80" value="' + esc(m.role) + '" placeholder="e.g. Head of Verification"></label>' +
      '<label class="span2">Bio<textarea name="bio" rows="4" maxlength="1200">' + esc(m.bio) + "</textarea></label>" +
      '<label>Phone (optional)<input name="phone" value="' + esc(m.phone) + '"></label>' +
      '<label>Email (optional)<input name="email" type="email" value="' + esc(m.email) + '"></label>' +
      '<label>LinkedIn (optional)<input name="linkedin" value="' + esc(m.linkedin) + '"></label>' +
      '<label>Display order<input name="order" type="number" value="' + esc(m.order || 0) + '"></label>' +
      '<label>Photo (JPG/PNG/WEBP)<input name="photo" type="file" accept="image/*"></label>' +
      '<label>Show on website<select name="visible">' + options({ true: "Yes", false: "No (hidden)" }, String(m.visible !== false)) + "</select></label>" +
      (m.photo ? '<label><input type="checkbox" name="removePhoto" value="true" style="width:auto"> Remove current photo</label>' : "") +
      '<div class="span2 actions"><button class="btn primary">Save</button></div></form>');
    $("team-form").onsubmit = function (e) {
      e.preventDefault();
      api(m.id ? "/api/admin/team/" + m.id : "/api/admin/team", { method: m.id ? "PATCH" : "POST", body: new FormData(e.target) })
        .then(function () { toast("Saved"); closeModal(); teamView(); }).catch(onError);
    };
  }

  // ---------- comments ----------
  function commentsView() {
    api("/.netlify/functions/moderate-comments").then(function (list) {
      $("view").innerHTML = list.length ? list.map(function (c) {
        return '<div class="card" style="margin-bottom:10px"><span class="muted">' + when(c.createdAt) + ' · on <a href="/blog/' + esc(c.pageId) + '" target="_blank" rel="noopener">' + esc(c.pageTitle || c.pageId) + "</a></span> " +
          (c.approved ? badge("verified", { verified: "Approved" }) : badge("pending", { pending: "Pending" })) + "<br><b>" + esc(c.name) + '</b><p style="white-space:pre-wrap">' + esc(c.text) + "</p>" +
          '<div class="actions" style="margin-top:6px">' + (c.approved ? "" : '<button class="btn sm success" data-ok="' + esc(c.id) + '" data-page="' + esc(c.pageId) + '">Approve</button>') +
          '<button class="btn sm danger" data-del="' + esc(c.id) + '" data-page="' + esc(c.pageId) + '">Delete</button></div></div>';
      }).join("") : '<div class="empty">No comments yet.</div>';
      var act = function (b, action) {
        if (action === "reject" && !confirm("Delete this comment?")) return;
        api("/.netlify/functions/moderate-comments", { method: "POST", json: { pageId: b.dataset.page, id: b.dataset.ok || b.dataset.del, action: action } }).then(function () { refreshCounts(); commentsView(); }).catch(onError);
      };
      $("view").querySelectorAll("[data-ok]").forEach(function (b) { b.onclick = function () { act(b, "approve"); }; });
      $("view").querySelectorAll("[data-del]").forEach(function (b) { b.onclick = function () { act(b, "reject"); }; });
    }).catch(onError);
  }

  // Old links: /admin/#comments etc. still land on the right view.
  if (pw) showApp(); else showLogin("");
})();
