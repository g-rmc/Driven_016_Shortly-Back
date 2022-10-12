--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

-- Started on 2022-10-11 22:22:47 -03

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
-- TOC entry 216 (class 1259 OID 17110)
-- Name: access; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.access (
    id integer NOT NULL,
    "urlId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.access OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 17109)
-- Name: access_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.access_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.access_id_seq OWNER TO postgres;

--
-- TOC entry 3395 (class 0 OID 0)
-- Dependencies: 215
-- Name: access_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.access_id_seq OWNED BY public.access.id;


--
-- TOC entry 214 (class 1259 OID 17095)
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "userId" integer NOT NULL,
    "userToken" text NOT NULL
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 17094)
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sessions_id_seq OWNER TO postgres;

--
-- TOC entry 3396 (class 0 OID 0)
-- Dependencies: 213
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- TOC entry 212 (class 1259 OID 17080)
-- Name: urls; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "userId" integer NOT NULL,
    "originalUrl" text NOT NULL,
    "shortUrl" text NOT NULL
);


ALTER TABLE public.urls OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 17079)
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.urls_id_seq OWNER TO postgres;

--
-- TOC entry 3397 (class 0 OID 0)
-- Dependencies: 211
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- TOC entry 210 (class 1259 OID 17068)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 17067)
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
-- TOC entry 3398 (class 0 OID 0)
-- Dependencies: 209
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3228 (class 2604 OID 17113)
-- Name: access id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.access ALTER COLUMN id SET DEFAULT nextval('public.access_id_seq'::regclass);


--
-- TOC entry 3226 (class 2604 OID 17098)
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- TOC entry 3224 (class 2604 OID 17083)
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- TOC entry 3222 (class 2604 OID 17071)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3389 (class 0 OID 17110)
-- Dependencies: 216
-- Data for Name: access; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.access (id, "urlId", "createdAt") FROM stdin;
\.


--
-- TOC entry 3387 (class 0 OID 17095)
-- Dependencies: 214
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (id, "createdAt", "userId", "userToken") FROM stdin;
\.


--
-- TOC entry 3385 (class 0 OID 17080)
-- Dependencies: 212
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.urls (id, "createdAt", "userId", "originalUrl", "shortUrl") FROM stdin;
\.


--
-- TOC entry 3383 (class 0 OID 17068)
-- Dependencies: 210
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, "createdAt", name, email, password) FROM stdin;
\.


--
-- TOC entry 3399 (class 0 OID 0)
-- Dependencies: 215
-- Name: access_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.access_id_seq', 1, false);


--
-- TOC entry 3400 (class 0 OID 0)
-- Dependencies: 213
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sessions_id_seq', 1, false);


--
-- TOC entry 3401 (class 0 OID 0)
-- Dependencies: 211
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.urls_id_seq', 1, false);


--
-- TOC entry 3402 (class 0 OID 0)
-- Dependencies: 209
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- TOC entry 3239 (class 2606 OID 17116)
-- Name: access access_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.access
    ADD CONSTRAINT access_pkey PRIMARY KEY (id);


--
-- TOC entry 3237 (class 2606 OID 17103)
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- TOC entry 3235 (class 2606 OID 17088)
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- TOC entry 3231 (class 2606 OID 17078)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 3233 (class 2606 OID 17076)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3242 (class 2606 OID 17117)
-- Name: access access_urlId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.access
    ADD CONSTRAINT "access_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES public.urls(id);


--
-- TOC entry 3241 (class 2606 OID 17104)
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- TOC entry 3240 (class 2606 OID 17089)
-- Name: urls urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


-- Completed on 2022-10-11 22:22:47 -03

--
-- PostgreSQL database dump complete
--

