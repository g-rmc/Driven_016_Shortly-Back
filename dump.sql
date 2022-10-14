--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

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
-- Name: access; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.access (
    id integer NOT NULL,
    "urlId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: access_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.access_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: access_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.access_id_seq OWNED BY public.access.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "userId" integer NOT NULL,
    "userToken" text NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "userId" integer NOT NULL,
    "originalUrl" text NOT NULL,
    "shortUrl" text NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password text NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: access id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.access ALTER COLUMN id SET DEFAULT nextval('public.access_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: access; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.access VALUES (6, 2, '2022-10-14 15:05:01.729248');
INSERT INTO public.access VALUES (7, 2, '2022-10-14 15:05:03.604112');
INSERT INTO public.access VALUES (8, 2, '2022-10-14 15:05:05.415545');
INSERT INTO public.access VALUES (9, 2, '2022-10-14 15:07:26.132236');
INSERT INTO public.access VALUES (10, 2, '2022-10-14 15:27:20.543729');
INSERT INTO public.access VALUES (11, 4, '2022-10-14 15:27:27.30634');
INSERT INTO public.access VALUES (12, 4, '2022-10-14 15:27:29.833263');
INSERT INTO public.access VALUES (13, 10, '2022-10-14 15:57:19.698353');


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (2, '2022-10-13 16:06:25.807046', 1, 'd38a0dc3-231d-480e-a9c5-3dcd54ca3411');
INSERT INTO public.sessions VALUES (3, '2022-10-14 15:09:05.744292', 2, '1604c395-3e78-410b-9c18-7dd578f32397');
INSERT INTO public.sessions VALUES (4, '2022-10-14 15:56:33.982315', 3, 'df585a60-c62b-48d7-8f5c-94b24ab03b11');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (2, '2022-10-14 15:02:56.899715', 1, 'https://hopihari.com.br/', '2rKWTnFg');
INSERT INTO public.urls VALUES (3, '2022-10-14 15:03:29.449966', 1, 'https://www.wetnwild.com.br/', 'XlYu43eD');
INSERT INTO public.urls VALUES (4, '2022-10-14 15:03:54.928143', 1, 'https://www.playcenterfamily.com/', 'q444DeOb');
INSERT INTO public.urls VALUES (5, '2022-10-14 15:56:59.1077', 3, 'https://www.playcenterfamily.com/', 'RFtw4cig');
INSERT INTO public.urls VALUES (6, '2022-10-14 15:57:00.23371', 3, 'https://www.playcenterfamily.com/', 'JaSCx-zM');
INSERT INTO public.urls VALUES (7, '2022-10-14 15:57:01.12483', 3, 'https://www.playcenterfamily.com/', '6ytFHn2P');
INSERT INTO public.urls VALUES (8, '2022-10-14 15:57:02.534562', 3, 'https://www.playcenterfamily.com/', 'EoTmZueW');
INSERT INTO public.urls VALUES (9, '2022-10-14 15:57:03.113678', 3, 'https://www.playcenterfamily.com/', 'USudQLlN');
INSERT INTO public.urls VALUES (10, '2022-10-14 15:57:03.706977', 3, 'https://www.playcenterfamily.com/', 'bgNvwhBe');
INSERT INTO public.urls VALUES (11, '2022-10-14 15:57:08.165509', 3, 'https://www.playcenterfamily.com/', 'o2zAGfUE');
INSERT INTO public.urls VALUES (12, '2022-10-14 16:08:28.949409', 2, 'https://www.playcenterfamily.com/', 'oYSzed2_');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, '2022-10-13 15:32:09.62803', 'João', 'joao@driven.com.br', '$2b$10$/vQFQCeCO33wWaKuHU9fouPe1oVC7IaMCj5OY2mTcKl911zCjlWeW');
INSERT INTO public.users VALUES (2, '2022-10-13 15:46:52.741448', 'Maria', 'maria@driven.com.br', '$2b$10$d2usIbANixGMNhpvaaCtR.Bs6QxnuK/SNBFi0leQieyRJi3qg4IjS');
INSERT INTO public.users VALUES (3, '2022-10-14 15:56:26.883161', 'Pedro', 'pedro@driven.com.br', '$2b$10$S.7pdCtfd7HxGSTug5BIoOsKXDZLhswQEprKt8DoYY4kh9Y6CBNay');
INSERT INTO public.users VALUES (4, '2022-10-14 15:59:21.170073', 'Rosa', 'rosa@driven.com.br', '$2b$10$Glg6lqEX.nGQxbyeewoyn.jQpvpLVpn6sFcBcrPzxJoseAPkcsfKa');
INSERT INTO public.users VALUES (5, '2022-10-14 16:10:01.985179', 'Fidalgo', 'fidalgo@driven.com.br', '$2b$10$XFSgPBgaQ45CEAqF7R6R2.6nH4raWYNLXmbOPYMBLOXeUx82T4rNy');
INSERT INTO public.users VALUES (6, '2022-10-14 16:10:12.892077', 'Clara', 'Clara@driven.com.br', '$2b$10$9gXWT1MWNAEFFAqxV3NuLOoA1vfh3TTND992rn7bSz.UOaLeJU0Dm');
INSERT INTO public.users VALUES (7, '2022-10-14 16:10:27.254055', 'Osvaldo', 'osvaldo@driven.com.br', '$2b$10$OOJrYq0Qj3zPWLoAeAPc.edTlaPsEQPbQW91sOHhN7VYAWoTmuSC.');
INSERT INTO public.users VALUES (8, '2022-10-14 16:10:39.444148', 'Patricia', 'patricia@driven.com.br', '$2b$10$jsYWDTKrWilizTW506pR9uztDiLWHnjtV51C..mbzcnTKcoUTJoai');
INSERT INTO public.users VALUES (9, '2022-10-14 16:10:55.40271', 'Lucas', 'lucas@driven.com.br', '$2b$10$iQW6yahJsMuwnq5JV.frBu6a0fm/.vU/DH.A3viovCoNqWKMIvRE6');
INSERT INTO public.users VALUES (10, '2022-10-14 16:11:07.631962', 'Lucelia', 'lucelia@driven.com.br', '$2b$10$qIhkcDWxOv5MoZayOS9IdeLxLhcqUHdaANCB88vJh3Kd9dpZ3DkE.');
INSERT INTO public.users VALUES (11, '2022-10-14 16:11:18.208778', 'Apolo', 'apolo@driven.com.br', '$2b$10$ksxwrgslvQrIfQkUUMFHeO7tstA.PsYoHNZBtjRLqMq9iPZsYHHuG');
INSERT INTO public.users VALUES (12, '2022-10-14 16:12:02.851627', 'Zeus', 'zeus@driven.com.br', '$2b$10$Cx0UGma/l9NEY3hyKTngAeiaUTJ5QzPiXY5lUiCD86AZ/0b0RmNMy');


--
-- Name: access_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.access_id_seq', 13, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 4, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 12, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 12, true);


--
-- Name: access access_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.access
    ADD CONSTRAINT access_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: access access_urlId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.access
    ADD CONSTRAINT "access_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES public.urls(id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: urls urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

