--
-- PostgreSQL database dump
--

-- Dumped from database version 12.8 (Ubuntu 12.8-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.8 (Ubuntu 12.8-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: applications; Type: TABLE; Schema: public; Owner: fairnightzz
--

CREATE TABLE public.applications (
    id integer NOT NULL,
    name character varying(30) NOT NULL,
    start_date timestamp without time zone NOT NULL,
    end_date timestamp without time zone NOT NULL,
    description character varying,
    image_url character varying(200),
    form_url character varying(200),
    bootcamp integer DEFAULT 0
);


ALTER TABLE public.applications OWNER TO fairnightzz;

--
-- Name: applications_id_seq; Type: SEQUENCE; Schema: public; Owner: fairnightzz
--

CREATE SEQUENCE public.applications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.applications_id_seq OWNER TO fairnightzz;

--
-- Name: applications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fairnightzz
--

ALTER SEQUENCE public.applications_id_seq OWNED BY public.applications.id;


--
-- Name: bootcamps; Type: TABLE; Schema: public; Owner: fairnightzz
--

CREATE TABLE public.bootcamps (
    id integer NOT NULL,
    name character varying(30) NOT NULL,
    start_date timestamp without time zone NOT NULL,
    end_date timestamp without time zone NOT NULL,
    description character varying,
    image_url character varying(200),
    default_zoom_url character varying(200)
);


ALTER TABLE public.bootcamps OWNER TO fairnightzz;

--
-- Name: bootcamps_id_seq; Type: SEQUENCE; Schema: public; Owner: fairnightzz
--

CREATE SEQUENCE public.bootcamps_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bootcamps_id_seq OWNER TO fairnightzz;

--
-- Name: bootcamps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fairnightzz
--

ALTER SEQUENCE public.bootcamps_id_seq OWNED BY public.bootcamps.id;


--
-- Name: events; Type: TABLE; Schema: public; Owner: fairnightzz
--

CREATE TABLE public.events (
    id integer NOT NULL,
    name character varying(30) NOT NULL,
    start_date timestamp without time zone NOT NULL,
    end_date timestamp without time zone NOT NULL,
    description character varying,
    image_url character varying(200),
    zoom_url character varying(200),
    bootcamp integer DEFAULT 0
);


ALTER TABLE public.events OWNER TO fairnightzz;

--
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: fairnightzz
--

CREATE SEQUENCE public.events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.events_id_seq OWNER TO fairnightzz;

--
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fairnightzz
--

ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    admin boolean DEFAULT false NOT NULL,
    first_name character varying(30) NOT NULL,
    last_name character varying(30) NOT NULL,
    school character varying(30) NOT NULL,
    program character varying(30),
    year_of_study character varying(30)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: applications id; Type: DEFAULT; Schema: public; Owner: fairnightzz
--

ALTER TABLE ONLY public.applications ALTER COLUMN id SET DEFAULT nextval('public.applications_id_seq'::regclass);


--
-- Name: bootcamps id; Type: DEFAULT; Schema: public; Owner: fairnightzz
--

ALTER TABLE ONLY public.bootcamps ALTER COLUMN id SET DEFAULT nextval('public.bootcamps_id_seq'::regclass);


--
-- Name: events id; Type: DEFAULT; Schema: public; Owner: fairnightzz
--

ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: applications; Type: TABLE DATA; Schema: public; Owner: fairnightzz
--

COPY public.applications (id, name, start_date, end_date, description, image_url, form_url, bootcamp) FROM stdin;
\.


--
-- Data for Name: bootcamps; Type: TABLE DATA; Schema: public; Owner: fairnightzz
--

COPY public.bootcamps (id, name, start_date, end_date, description, image_url, default_zoom_url) FROM stdin;
\.


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: fairnightzz
--

COPY public.events (id, name, start_date, end_date, description, image_url, zoom_url, bootcamp) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, admin, first_name, last_name, school, program, year_of_study) FROM stdin;
\.


--
-- Name: applications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fairnightzz
--

SELECT pg_catalog.setval('public.applications_id_seq', 1, false);


--
-- Name: bootcamps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fairnightzz
--

SELECT pg_catalog.setval('public.bootcamps_id_seq', 1, false);


--
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fairnightzz
--

SELECT pg_catalog.setval('public.events_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: applications pk_applications; Type: CONSTRAINT; Schema: public; Owner: fairnightzz
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT pk_applications PRIMARY KEY (id);


--
-- Name: bootcamps pk_bootcamps; Type: CONSTRAINT; Schema: public; Owner: fairnightzz
--

ALTER TABLE ONLY public.bootcamps
    ADD CONSTRAINT pk_bootcamps PRIMARY KEY (id);


--
-- Name: events pk_events; Type: CONSTRAINT; Schema: public; Owner: fairnightzz
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT pk_events PRIMARY KEY (id);


--
-- Name: applications fk_applications; Type: FK CONSTRAINT; Schema: public; Owner: fairnightzz
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT fk_applications FOREIGN KEY (bootcamp) REFERENCES public.bootcamps(id);


--
-- Name: events fk_events; Type: FK CONSTRAINT; Schema: public; Owner: fairnightzz
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT fk_events FOREIGN KEY (bootcamp) REFERENCES public.bootcamps(id);


--
-- PostgreSQL database dump complete
--

