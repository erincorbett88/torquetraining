CREATE TABLE IF NOT EXISTS teams (
  id uuid NOT NULL PRIMARY KEY,
  name varchar(255) NOT NULL,
  description varchar(255) NOT NULL,
  last_updated DATE,
  version VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS members (
  id uuid NOT NULL PRIMARY KEY,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  email varchar(30) NOT NULL,
  team_id uuid NOT NULL,
  CONSTRAINT fk_team FOREIGN KEY (team_id) REFERENCES teams(id)
);
