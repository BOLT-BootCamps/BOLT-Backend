CREATE TABLE bootcamps
(
  id SERIAL,
  name VARCHAR(30) NOT NULL,
  start_date timestamp NOT NULL,
  end_date timestamp NOT NULL,
  description VARCHAR,
  image_url VARCHAR(200),
  default_zoom_url VARCHAR(200)
);

ALTER TABLE bootcamps
ADD CONSTRAINT PK_bootcamps
PRIMARY KEY (id);



CREATE TABLE events
(
  id SERIAL,
  name VARCHAR(30) NOT NULL,
  start_date timestamp NOT NULL,
  end_date timestamp NOT NULL,
  description VARCHAR,
  image_url VARCHAR(200),
  zoom_url VARCHAR(200),
  bootcamp integer DEFAULT 0
);

ALTER TABLE events
ADD CONSTRAINT PK_events
PRIMARY KEY (id);

ALTER TABLE events
ADD CONSTRAINT FK_events
FOREIGN KEY (bootcamp)
REFERENCES bootcamps(id);

CREATE TABLE applications
(
  id SERIAL,
  name VARCHAR(30) NOT NULL,
  start_date timestamp NOT NULL,
  end_date timestamp NOT NULL,
  description VARCHAR,
  image_url VARCHAR(200),
  form_url VARCHAR(200),
  bootcamp integer DEFAULT 0
);

ALTER TABLE applications
ADD CONSTRAINT PK_applications
PRIMARY KEY (id);

ALTER TABLE applications
ADD CONSTRAINT FK_applications
FOREIGN KEY (bootcamp)
REFERENCES bootcamps(id);

CREATE TABLE users
(
  id SERIAL,
  admin BOOLEAN NOT NULL DEFAULT FALSE,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  school VARCHAR(30) NOT NULL,
  program VARCHAR(30),
  year_of_study VARCHAR(30)
);


