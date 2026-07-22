-- Pine Travel — database schema
-- `npm run setup` ye khud chala deta hai. Manually chalana ho to
-- Hostinger hPanel > Databases > phpMyAdmin me paste kar dein.

CREATE TABLE IF NOT EXISTS users (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  email         VARCHAR(190) NOT NULL UNIQUE,
  name          VARCHAR(120) NOT NULL DEFAULT 'Admin',
  password_hash VARCHAR(255) NOT NULL,
  created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Singletons aur lists: site, hero, services, offers, regions, whyUs,
-- quote, customize, partners, counters, footer, faqs, testimonials
CREATE TABLE IF NOT EXISTS content (
  content_key VARCHAR(64) NOT NULL PRIMARY KEY,
  data        LONGTEXT NOT NULL,
  updated_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- kind: 'package' | 'deal' | 'daytrip'
CREATE TABLE IF NOT EXISTS packages (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  slug       VARCHAR(160) NOT NULL,
  kind       VARCHAR(20) NOT NULL DEFAULT 'package',
  sort_order INT NOT NULL DEFAULT 0,
  published  TINYINT(1) NOT NULL DEFAULT 1,
  data       LONGTEXT NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_kind_slug (kind, slug),
  KEY idx_kind_sort (kind, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS hotels (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  slug       VARCHAR(160) NOT NULL UNIQUE,
  sort_order INT NOT NULL DEFAULT 0,
  published  TINYINT(1) NOT NULL DEFAULT 1,
  data       LONGTEXT NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS posts (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  slug       VARCHAR(160) NOT NULL UNIQUE,
  sort_order INT NOT NULL DEFAULT 0,
  published  TINYINT(1) NOT NULL DEFAULT 1,
  data       LONGTEXT NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Website se aane wali booking / contact enquiries
CREATE TABLE IF NOT EXISTS enquiries (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  type       VARCHAR(32) NOT NULL DEFAULT 'contact',
  name       VARCHAR(160) NOT NULL DEFAULT '',
  phone      VARCHAR(60) NOT NULL DEFAULT '',
  email      VARCHAR(190) NOT NULL DEFAULT '',
  subject    VARCHAR(255) NOT NULL DEFAULT '',
  message    TEXT NULL,
  payload    LONGTEXT NULL,
  status     VARCHAR(20) NOT NULL DEFAULT 'new',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_status_created (status, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS media (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  filename   VARCHAR(255) NOT NULL,
  url        VARCHAR(500) NOT NULL,
  mime       VARCHAR(120) NOT NULL DEFAULT '',
  size_bytes INT NOT NULL DEFAULT 0,
  kind       VARCHAR(20) NOT NULL DEFAULT 'image',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_kind_created (kind, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
