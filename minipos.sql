--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.11
-- Dumped by pg_dump version 9.5.11

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: Items; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE "Items" (
    id integer NOT NULL,
    name character varying(255),
    brand character varying(255),
    "codeItem" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE "Items" OWNER TO admin;

--
-- Name: Items_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE "Items_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Items_id_seq" OWNER TO admin;

--
-- Name: Items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE "Items_id_seq" OWNED BY "Items".id;


--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE "SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE "SequelizeMeta" OWNER TO admin;

--
-- Name: SupplierItems; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE "SupplierItems" (
    id integer NOT NULL,
    "SupplierId" integer,
    "ItemId" integer,
    price integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE "SupplierItems" OWNER TO admin;

--
-- Name: SupplierItems_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE "SupplierItems_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "SupplierItems_id_seq" OWNER TO admin;

--
-- Name: SupplierItems_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE "SupplierItems_id_seq" OWNED BY "SupplierItems".id;


--
-- Name: Suppliers; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE "Suppliers" (
    id integer NOT NULL,
    name character varying(255),
    kota character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE "Suppliers" OWNER TO admin;

--
-- Name: Suppliers_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE "Suppliers_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Suppliers_id_seq" OWNER TO admin;

--
-- Name: Suppliers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE "Suppliers_id_seq" OWNED BY "Suppliers".id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY "Items" ALTER COLUMN id SET DEFAULT nextval('"Items_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY "SupplierItems" ALTER COLUMN id SET DEFAULT nextval('"SupplierItems_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY "Suppliers" ALTER COLUMN id SET DEFAULT nextval('"Suppliers_id_seq"'::regclass);


--
-- Data for Name: Items; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY "Items" (id, name, brand, "codeItem", "createdAt", "updatedAt") FROM stdin;
2	MI 5S	Xiaomi	SW0923	2018-02-27 12:07:50.7+07	2018-02-27 12:07:50.7+07
3	Iphone 8	Apple	HP0876	2018-02-27 12:07:50.7+07	2018-02-27 12:07:50.7+07
4	Galaxy S8	Samsung	LP6543	2018-02-27 12:07:50.7+07	2018-02-27 12:07:50.7+07
5	Q6 Astro Black	LG	LP0421	2018-02-27 12:07:50.7+07	2018-02-27 12:07:50.7+07
7	Xperia Z3	Sony	SW2403	2018-02-27 15:59:02.789+07	2018-02-27 21:59:05.861+07
18	Desire 2	HTC	HP2402	2018-02-27 23:11:37.769+07	2018-02-27 23:11:37.769+07
\.


--
-- Name: Items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('"Items_id_seq"', 19, true);


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY "SequelizeMeta" (name) FROM stdin;
20180227044547-create-item.js
20180227044716-create-supplier.js
20180227094229-create-supplier-item.js
\.


--
-- Data for Name: SupplierItems; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY "SupplierItems" (id, "SupplierId", "ItemId", price, "createdAt", "updatedAt") FROM stdin;
8	5	2	3100000	2018-02-27 21:46:57.372+07	2018-02-27 21:46:57.372+07
9	5	5	5000000	2018-02-27 22:11:44.786+07	2018-02-27 22:11:44.786+07
4	7	17	3500000	2018-02-27 18:10:42.303+07	2018-02-27 18:10:42.303+07
6	7	4	7000000	2018-02-27 20:49:44.632+07	2018-02-27 20:49:44.632+07
7	7	3	10000000	2018-02-27 21:46:42.896+07	2018-02-27 21:46:42.896+07
10	7	18	4500000	2018-02-27 23:12:13.483+07	2018-02-27 23:12:13.483+07
12	8	17	4000000	2018-02-27 23:58:58.221+07	2018-02-27 23:58:58.221+07
\.


--
-- Name: SupplierItems_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('"SupplierItems_id_seq"', 12, true);


--
-- Data for Name: Suppliers; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY "Suppliers" (id, name, kota, "createdAt", "updatedAt") FROM stdin;
3	PT. Ganeca Kiara	Bandung	2018-02-27 13:34:40.026+07	2018-02-27 13:34:40.026+07
7	PT. Jaya Abadi	Bandung	2018-02-27 23:55:22.456+07	2018-02-27 23:55:22.456+07
8	PT. Birutekno	Bali	2018-02-27 23:58:11.507+07	2018-02-27 23:58:11.507+07
\.


--
-- Name: Suppliers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('"Suppliers_id_seq"', 8, true);


--
-- Name: Items_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY "Items"
    ADD CONSTRAINT "Items_pkey" PRIMARY KEY (id);


--
-- Name: SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY "SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: SupplierItems_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY "SupplierItems"
    ADD CONSTRAINT "SupplierItems_pkey" PRIMARY KEY (id);


--
-- Name: Suppliers_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY "Suppliers"
    ADD CONSTRAINT "Suppliers_pkey" PRIMARY KEY (id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

