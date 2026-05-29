-
-- PostgreSQL database dump
--

\restrict 6S9y4EZTuf1xT3iSdYA62t8gAQCaGP7R1FLhlbh7EmpFifYvxQOofMroDvCfw7e

-- Dumped from database version 18.4 (Debian 18.4-1.pgdg12+1)
-- Dumped by pg_dump version 18.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: sm_progression_db_user
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO sm_progression_db_user;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: config; Type: TABLE; Schema: public; Owner: sm_progression_db_user
--

CREATE TABLE public.config (
    key text NOT NULL,
    value text
);


ALTER TABLE public.config OWNER TO sm_progression_db_user;

--
-- Name: progression; Type: TABLE; Schema: public; Owner: sm_progression_db_user
--

CREATE TABLE public.progression (
    raid text NOT NULL,
    boss text NOT NULL,
    status integer,
    messageid text
);


ALTER TABLE public.progression OWNER TO sm_progression_db_user;

--
-- Data for Name: config; Type: TABLE DATA; Schema: public; Owner: sm_progression_db_user
--

COPY public.config (key, value) FROM stdin;
roleId	305459480760680448
\.


--
-- Data for Name: progression; Type: TABLE DATA; Schema: public; Owner: sm_progression_db_user
--

COPY public.progression (raid, boss, status, messageid) FROM stdin;
Vanilla ÔÇö Naxxramas 40	Anub'Rekhan	0	1509632214059716761
Vanilla ÔÇö Naxxramas 40	Gothik le Moissonneur	0	1509632214059716761
Vanilla ÔÇö Naxxramas 40	Grande veuve Faerlina	0	1509632214059716761
Vanilla ÔÇö Naxxramas 40	Heigan l'Impur	0	1509632214059716761
Vanilla ÔÇö Naxxramas 40	Horreb	0	1509632214059716761
Vanilla ÔÇö Naxxramas 40	Instructeur Razuvious	0	1509632214059716761
Vanilla ÔÇö Naxxramas 40	Kel'Thuzad	0	1509632214059716761
Vanilla ÔÇö Naxxramas 40	Les Quatre Cavaliers	0	1509632214059716761
Vanilla ÔÇö Naxxramas 40	Maexxna	0	1509632214059716761
Vanilla ÔÇö Naxxramas 40	Noth le Porte-peste	0	1509632214059716761
Vanilla ÔÇö Naxxramas 40	Sapphiron	0	1509632214059716761
Vanilla ÔÇö C┼ôur du Magma	Baron Geddon	0	1509632199027331163
Vanilla ÔÇö C┼ôur du Magma	Garr	0	1509632199027331163
Vanilla ÔÇö C┼ôur du Magma	Gehennas	0	1509632199027331163
Vanilla ÔÇö C┼ôur du Magma	Golemagg l'Incin├®rateur	0	1509632199027331163
Vanilla ÔÇö C┼ôur du Magma	Lucifron	0	1509632199027331163
Vanilla ÔÇö C┼ôur du Magma	Magmadar	0	1509632199027331163
Vanilla ÔÇö C┼ôur du Magma	Majordomo Executus	0	1509632199027331163
Vanilla ÔÇö C┼ôur du Magma	Ragnaros	0	1509632199027331163
Vanilla ÔÇö C┼ôur du Magma	Shazzrah	0	1509632199027331163
Vanilla ÔÇö C┼ôur du Magma	Sulfuron l'Incendiaire	0	1509632199027331163
Vanilla ÔÇö Repaire de l'Aile noire	Chromaggus	0	1509632210154815598
Vanilla ÔÇö Repaire de l'Aile noire	Flamegor	0	1509632210154815598
Vanilla ÔÇö Repaire de l'Aile noire	Gueule-de-feu	0	1509632210154815598
Vanilla ÔÇö Repaire de l'Aile noire	Nefarian	0	1509632210154815598
Vanilla ÔÇö Repaire de l'Aile noire	Roch├®b├¿ne	0	1509632210154815598
Vanilla ÔÇö Repaire de l'Aile noire	Seigneur des couv├®es Lashlayer	0	1509632210154815598
Vanilla ÔÇö Repaire de l'Aile noire	Tranchetripe l'Indompt├®	0	1509632210154815598
Vanilla ÔÇö Repaire de l'Aile noire	Vaelastrasz le Corrompu	0	1509632210154815598
Vanilla ÔÇö Ruines d'Ahn'Qiraj (AQ20)	Ayamiss le Chasseur	0	1509632210905333933
Vanilla ÔÇö Ruines d'Ahn'Qiraj (AQ20)	Buru le Gorger	0	1509632210905333933
Vanilla ÔÇö Ruines d'Ahn'Qiraj (AQ20)	G├®n├®ral Rajaxx	0	1509632210905333933
Vanilla ÔÇö Ruines d'Ahn'Qiraj (AQ20)	Kurinnaxx	0	1509632210905333933
Vanilla ÔÇö Ruines d'Ahn'Qiraj (AQ20)	Moam	0	1509632210905333933
Vanilla ÔÇö Ruines d'Ahn'Qiraj (AQ20)	Ossirian l'Intouch├®	0	1509632210905333933
Vanilla ÔÇö Temple d'Ahn'Qiraj (AQ40)	C'Thun	0	1509632212524339430
Vanilla ÔÇö Temple d'Ahn'Qiraj (AQ40)	Empereurs jumeaux (Vek'lor & Vek'nilash)	0	1509632212524339430
Vanilla ÔÇö Temple d'Ahn'Qiraj (AQ40)	Fankriss l'Infatigable	0	1509632212524339430
Vanilla ÔÇö Temple d'Ahn'Qiraj (AQ40)	Garde de bataille Sartura	0	1509632212524339430
Vanilla ÔÇö Temple d'Ahn'Qiraj (AQ40)	Le Proph├¿te Skeram	0	1509632212524339430
Vanilla ÔÇö Temple d'Ahn'Qiraj (AQ40)	Ouro	0	1509632212524339430
Vanilla ÔÇö Temple d'Ahn'Qiraj (AQ40)	Princesse Huhuran	0	1509632212524339430
Vanilla ÔÇö Temple d'Ahn'Qiraj (AQ40)	Trio des insectes	0	1509632212524339430
Vanilla ÔÇö Temple d'Ahn'Qiraj (AQ40)	Viscidus	0	1509632212524339430
BC ÔÇö Repaire de Gruul	Gruul le Tue-dragon	0	1509632216521511065
BC ÔÇö Repaire de Gruul	Haut Roi Maulgar	0	1509632216521511065
WOTLK ÔÇö Naxxramas 10 Normal	Noth le Porte-peste	1	1509632264391233588
WOTLK ÔÇö Naxxramas 10 Normal	Heigan l'Impur	1	1509632264391233588
BC ÔÇö Caverne du Sanctuaire du Serpent	Hydross l'Instable	0	1509632239145844948
BC ÔÇö Caverne du Sanctuaire du Serpent	Leotheras l'Aveugle	0	1509632239145844948
BC ÔÇö Caverne du Sanctuaire du Serpent	Le R├┤deur d'En-dessous	0	1509632239145844948
BC ÔÇö Caverne du Sanctuaire du Serpent	Morogrim Marcheur-des-flots	0	1509632239145844948
BC ÔÇö Caverne du Sanctuaire du Serpent	Seigneur des fonds Karathress	0	1509632239145844948
WOTLK ÔÇö Naxxramas 10 Normal	Horreb	1	1509632264391233588
WOTLK ÔÇö Naxxramas 10 Normal	Instructeur Razuvious	1	1509632264391233588
WOTLK ÔÇö Naxxramas 10 Normal	Gothik le Moissonneur	1	1509632264391233588
BC ÔÇö Hyjal	Anetheron	0	1509632241620226182
BC ÔÇö Hyjal	Archimonde	0	1509632241620226182
BC ÔÇö Hyjal	Azgalor	0	1509632241620226182
BC ÔÇö Hyjal	Kaz'rogal	0	1509632241620226182
BC ÔÇö Hyjal	Rage Froidhiver	0	1509632241620226182
BC ÔÇö Plateau du Puits de Soleil	Brutallus	0	1509632244896104761
BC ÔÇö Plateau du Puits de Soleil	Felmyst	0	1509632244896104761
BC ÔÇö Plateau du Puits de Soleil	Kalecgos	0	1509632244896104761
BC ÔÇö Plateau du Puits de Soleil	Kil'jaeden	0	1509632244896104761
BC ÔÇö Plateau du Puits de Soleil	Les jumelles Eredar	0	1509632244896104761
BC ÔÇö Plateau du Puits de Soleil	M'uru	0	1509632244896104761
WOTLK ÔÇö Naxxramas 10 Normal	Kel'Thuzad	1	1509632264391233588
WOTLK ÔÇö Naxxramas 25 Normal	Les Quatre Cavaliers	0	1509632266580529222
WOTLK ÔÇö Naxxramas 10 Normal	Les Quatre Cavaliers	1	1509632264391233588
WOTLK ÔÇö Naxxramas 25 Normal	Anub'Rekhan	0	1509632266580529222
WOTLK ÔÇö Naxxramas 25 Normal	Gothik le Moissonneur	0	1509632266580529222
WOTLK ÔÇö Naxxramas 25 Normal	Grande veuve Faerlina	0	1509632266580529222
WOTLK ÔÇö Naxxramas 25 Normal	Heigan l'Impur	0	1509632266580529222
WOTLK ÔÇö Naxxramas 25 Normal	Horreb	0	1509632266580529222
WOTLK ÔÇö Naxxramas 25 Normal	Instructeur Razuvious	0	1509632266580529222
WOTLK ÔÇö Naxxramas 25 Normal	Kel'Thuzad	0	1509632266580529222
WOTLK ÔÇö Naxxramas 25 Normal	Maexxna	0	1509632266580529222
WOTLK ÔÇö Naxxramas 25 Normal	Noth le Porte-peste	0	1509632266580529222
WOTLK ÔÇö Naxxramas 25 Normal	Sapphiron	0	1509632266580529222
BC ÔÇö Caverne du Sanctuaire du Serpent	Dame Vashj	0	1509632239145844948
BC ÔÇö Repaire de Magtheridon	Magtheridon	0	1509632237421858856
BC ÔÇö Donjon de la Temp├¬te	Al'ar	1	1509632240798273708
BC ÔÇö Donjon de la Temp├¬te	Solarium du Vide	1	1509632240798273708
BC ÔÇö Donjon de la Temp├¬te	Grande astromancienne Solarian	1	1509632240798273708
BC ÔÇö Donjon de la Temp├¬te	Kael'thas Haut-Soleil	1	1509632240798273708
WOTLK ÔÇö Naxxramas 10 Normal	Anub'Rekhan	1	1509632264391233588
WOTLK ÔÇö Naxxramas 10 Normal	Grande veuve Faerlina	1	1509632264391233588
WOTLK ÔÇö Naxxramas 10 Normal	Maexxna	1	1509632264391233588
BC ÔÇö Temple Noir	Conseil Illidari	0	1509632243105267844
BC ÔÇö Temple Noir	Gurtogg Fi├¿vresang	0	1509632243105267844
BC ÔÇö Karazhan	Attumen le Veneur	0	1509632215242375343
BC ÔÇö Karazhan	Damoiselle de Vertu	0	1509632215242375343
BC ÔÇö Karazhan	Le Conservateur	0	1509632215242375343
BC ÔÇö Karazhan	L'Ombre d'Aran	0	1509632215242375343
BC ÔÇö Karazhan	Moroes	0	1509632215242375343
BC ÔÇö Karazhan	Op├®ra	0	1509632215242375343
BC ÔÇö Karazhan	Plaie-de-Nuit	0	1509632215242375343
BC ÔÇö Karazhan	Prince Malchezaar	0	1509632215242375343
BC ÔÇö Karazhan	Terestian Malsabot	0	1509632215242375343
BC ÔÇö Temple Noir	Illidan Hurlorage	0	1509632243105267844
BC ÔÇö Temple Noir	M├¿re Shahraz	0	1509632243105267844
BC ÔÇö Temple Noir	Ombre d'Akama	0	1509632243105267844
BC ÔÇö Temple Noir	Reliquaire des ├émes	0	1509632243105267844
BC ÔÇö Temple Noir	Seigneur Naj'entus	0	1509632243105267844
BC ÔÇö Temple Noir	Supremus	0	1509632243105267844
BC ÔÇö Temple Noir	Teron Fielsang	0	1509632243105267844
WOTLK ÔÇö Sanctum Obsidien 25 Normal	Sartharion	0	1509632281713840248
WOTLK ÔÇö ┼Æil de l'├ëternit├® 10 Normal	Malygos	0	1509632282720342128
WOTLK ÔÇö ┼Æil de l'├ëternit├® 25 Normal	Malygos	0	1509632304140517511
WOTLK ÔÇö Ulduar 10 Normal	Algalon l'Observateur	0	1509632305319121099
WOTLK ÔÇö Ulduar 10 Normal	Auriaya	0	1509632305319121099
WOTLK ÔÇö Ulduar 25 Normal	Algalon l'Observateur	0	1509632306543857724
WOTLK ÔÇö Ulduar 25 Normal	Auriaya	0	1509632306543857724
WOTLK ÔÇö Ulduar 25 Normal	Flame Leviathan	0	1509632306543857724
WOTLK ÔÇö Ulduar 25 Normal	Freya	0	1509632306543857724
WOTLK ÔÇö Ulduar 25 Normal	G├®n├®ral Vezax	0	1509632306543857724
WOTLK ÔÇö Ulduar 25 Normal	Hodir	0	1509632306543857724
WOTLK ÔÇö Ulduar 25 Normal	Ignis le ma├«tre de la Fournaise	0	1509632306543857724
WOTLK ÔÇö Ulduar 25 Normal	Kologarn	0	1509632306543857724
WOTLK ÔÇö Ulduar 25 Normal	Mimiron	0	1509632306543857724
WOTLK ÔÇö Ulduar 25 Normal	Thorim	0	1509632306543857724
WOTLK ÔÇö Ulduar 25 Normal	Tranch├®caille	0	1509632306543857724
WOTLK ÔÇö Ulduar 25 Normal	XT-002 D├®constructeur	0	1509632306543857724
WOTLK ÔÇö Ulduar 10 H├®ro├»que	Algalon l'Observateur	0	1509632308435615754
WOTLK ÔÇö Ulduar 10 H├®ro├»que	Flame Leviathan (HM)	0	1509632308435615754
WOTLK ÔÇö Ulduar 10 H├®ro├»que	Freya (HM)	0	1509632308435615754
WOTLK ÔÇö Ulduar 10 H├®ro├»que	Hodir (HM)	0	1509632308435615754
WOTLK ÔÇö Ulduar 10 H├®ro├»que	Mimiron (HM)	0	1509632308435615754
WOTLK ÔÇö Ulduar 10 H├®ro├»que	Thorim (HM)	0	1509632308435615754
WOTLK ÔÇö Ulduar 10 H├®ro├»que	XT-002 (HM)	0	1509632308435615754
WOTLK ÔÇö Ulduar 10 H├®ro├»que	Yogg-Saron +0	0	1509632308435615754
WOTLK ÔÇö Ulduar 25 H├®ro├»que	Algalon l'Observateur	0	1509632309651964207
WOTLK ÔÇö Ulduar 25 H├®ro├»que	Flame Leviathan (HM)	0	1509632309651964207
WOTLK ÔÇö Ulduar 25 H├®ro├»que	Freya (HM)	0	1509632309651964207
WOTLK ÔÇö Ulduar 25 H├®ro├»que	Hodir (HM)	0	1509632309651964207
WOTLK ÔÇö Ulduar 25 H├®ro├»que	Mimiron (HM)	0	1509632309651964207
WOTLK ÔÇö Ulduar 25 H├®ro├»que	Thorim (HM)	0	1509632309651964207
WOTLK ÔÇö Ulduar 25 H├®ro├»que	XT-002 (HM)	0	1509632309651964207
WOTLK ÔÇö Ulduar 10 Normal	Flame Leviathan	0	1509632305319121099
WOTLK ÔÇö Ulduar 25 H├®ro├»que	Yogg-Saron +0	0	1509632309651964207
WOTLK ÔÇö ├ëpreuve du Crois├® 10 Normal	Anub'arak	0	1509632311464034414
WOTLK ÔÇö ├ëpreuve du Crois├® 10 Normal	B├¬tes du Norfendre	0	1509632311464034414
WOTLK ÔÇö ├ëpreuve du Crois├® 10 Normal	Champions de la faction	0	1509632311464034414
WOTLK ÔÇö ├ëpreuve du Crois├® 10 Normal	Seigneur Jaraxxus	0	1509632311464034414
WOTLK ÔÇö ├ëpreuve du Crois├® 10 Normal	Val'kyr jumelles	0	1509632311464034414
WOTLK ÔÇö ├ëpreuve du Crois├® 25 Normal	Anub'arak	0	1509632331281862656
WOTLK ÔÇö ├ëpreuve du Crois├® 25 Normal	B├¬tes du Norfendre	0	1509632331281862656
WOTLK ÔÇö ├ëpreuve du Crois├® 25 Normal	Champions de la faction	0	1509632331281862656
WOTLK ÔÇö ├ëpreuve du Crois├® 25 Normal	Seigneur Jaraxxus	0	1509632331281862656
WOTLK ÔÇö ├ëpreuve du Crois├® 25 Normal	Val'kyr jumelles	0	1509632331281862656
WOTLK ÔÇö ├ëpreuve du Crois├® 10 H├®ro├»que	B├¬tes du Norfendre (HM)	0	1509632332854722721
WOTLK ÔÇö ├ëpreuve du Crois├® 10 H├®ro├»que	Seigneur Jaraxxus (HM)	0	1509632332854722721
WOTLK ÔÇö Ulduar 25 Normal	Yogg-Saron	0	1509632306543857724
WOTLK ÔÇö Sanctum Rubis 10 Normal	Halion	0	1509632268510167131
WOTLK ÔÇö Sanctum Rubis 25 Normal	Halion	0	1509632269642371104
WOTLK ÔÇö Sanctum Rubis 10 H├®ro├»que	Halion	0	1509632271601242164
WOTLK ÔÇö Sanctum Rubis 25 H├®ro├»que	Halion	0	1509632278387752960
WOTLK ÔÇö Sanctum Obsidien 10 Normal	Sartharion	0	1509632279951970304
WOTLK ÔÇö Ulduar 10 Normal	Freya	0	1509632305319121099
WOTLK ÔÇö Ulduar 10 Normal	G├®n├®ral Vezax	0	1509632305319121099
WOTLK ÔÇö Ulduar 10 Normal	Hodir	0	1509632305319121099
WOTLK ÔÇö Ulduar 10 Normal	Ignis le ma├«tre de la Fournaise	0	1509632305319121099
WOTLK ÔÇö Ulduar 10 Normal	Kologarn	0	1509632305319121099
WOTLK ÔÇö Ulduar 10 Normal	Mimiron	0	1509632305319121099
WOTLK ÔÇö Ulduar 10 Normal	Thorim	0	1509632305319121099
WOTLK ÔÇö Ulduar 10 Normal	Tranch├®caille	0	1509632305319121099
WOTLK ÔÇö Ulduar 10 Normal	XT-002 D├®constructeur	0	1509632305319121099
WOTLK ÔÇö ICC 10 H├®ro├»que	Conseil des Princes de sang (HM)	0	1509632340878426112
WOTLK ÔÇö ICC 10 H├®ro├»que	Le Roi-liche (HM)	0	1509632340878426112
WOTLK ÔÇö ICC 10 H├®ro├»que	Professeur Putricide (HM)	0	1509632340878426112
WOTLK ÔÇö ICC 10 H├®ro├»que	Pulentraille (HM)	0	1509632340878426112
WOTLK ÔÇö ICC 10 H├®ro├»que	Reine de Sang Lana'thel (HM)	0	1509632340878426112
WOTLK ÔÇö ICC 10 H├®ro├»que	Sindragosa (HM)	0	1509632340878426112
WOTLK ÔÇö ICC 10 Normal	Seigneur Gargamoelle	1	1509632337724313780
WOTLK ÔÇö ICC 10 Normal	Dame Murmemort	1	1509632337724313780
WOTLK ÔÇö ICC 10 Normal	Bataille navale	1	1509632337724313780
WOTLK ÔÇö ICC 10 Normal	Saurcroc le Jeune	1	1509632337724313780
WOTLK ÔÇö ICC 10 Normal	Pulentraille	1	1509632337724313780
WOTLK ÔÇö ICC 10 Normal	Trognepus	1	1509632337724313780
WOTLK ÔÇö ICC 10 Normal	Professeur Putricide	1	1509632337724313780
WOTLK ÔÇö ICC 10 Normal	Conseil des Princes de sang	1	1509632337724313780
WOTLK ÔÇö ICC 10 Normal	Reine de Sang Lana'thel	1	1509632337724313780
WOTLK ÔÇö ICC 10 Normal	Valithria Marcher├¬ve	1	1509632337724313780
WOTLK ÔÇö ICC 10 Normal	Sindragosa	1	1509632337724313780
WOTLK ÔÇö ICC 10 H├®ro├»que	Seigneur Gargamoelle (HM)	1	1509632340878426112
WOTLK ÔÇö ICC 10 H├®ro├»que	Dame Murmemort (HM)	1	1509632340878426112
WOTLK ÔÇö ICC 10 H├®ro├»que	Bataille navale (HM)	1	1509632340878426112
WOTLK ÔÇö ICC 10 H├®ro├»que	Saurcroc le Jeune (HM)	1	1509632340878426112
WOTLK ÔÇö ├ëpreuve du Crois├® 10 H├®ro├»que	Anub'arak (HM)	0	1509632332854722721
WOTLK ÔÇö ├ëpreuve du Crois├® 10 H├®ro├»que	Champions de la faction (HM)	0	1509632332854722721
WOTLK ÔÇö ├ëpreuve du Crois├® 10 H├®ro├»que	Val'kyr jumelles (HM)	0	1509632332854722721
WOTLK ÔÇö ├ëpreuve du Crois├® 25 H├®ro├»que	Anub'arak (HM)	0	1509632334889222174
WOTLK ÔÇö ├ëpreuve du Crois├® 25 H├®ro├»que	B├¬tes du Norfendre (HM)	0	1509632334889222174
WOTLK ÔÇö ├ëpreuve du Crois├® 25 H├®ro├»que	Champions de la faction (HM)	0	1509632334889222174
WOTLK ÔÇö ├ëpreuve du Crois├® 25 H├®ro├»que	Seigneur Jaraxxus (HM)	0	1509632334889222174
WOTLK ÔÇö ├ëpreuve du Crois├® 25 H├®ro├»que	Val'kyr jumelles (HM)	0	1509632334889222174
WOTLK ÔÇö ICC 10 Normal	Le Roi-liche	0	1509632337724313780
WOTLK ÔÇö ICC 25 Normal	Bataille navale	0	1509632339549093961
WOTLK ÔÇö ICC 25 Normal	Conseil des Princes de sang	0	1509632339549093961
WOTLK ÔÇö ICC 25 Normal	Dame Murmemort	0	1509632339549093961
WOTLK ÔÇö ICC 25 Normal	Le Roi-liche	0	1509632339549093961
WOTLK ÔÇö ICC 25 Normal	Professeur Putricide	0	1509632339549093961
WOTLK ÔÇö ICC 25 Normal	Pulentraille	0	1509632339549093961
WOTLK ÔÇö ICC 25 Normal	Reine de Sang Lana'thel	0	1509632339549093961
WOTLK ÔÇö ICC 25 Normal	Saurcroc le Jeune	0	1509632339549093961
WOTLK ÔÇö ICC 25 Normal	Seigneur Gargamoelle	0	1509632339549093961
WOTLK ÔÇö ICC 25 Normal	Sindragosa	0	1509632339549093961
WOTLK ÔÇö ICC 25 Normal	Trognepus	0	1509632339549093961
WOTLK ÔÇö ICC 25 Normal	Valithria Marcher├¬ve	0	1509632339549093961
WOTLK ÔÇö Ulduar 10 Normal	Yogg-Saron	0	1509632305319121099
WOTLK ÔÇö ICC 10 H├®ro├»que	Valithria Marcher├¬ve (HM)	0	1509632340878426112
WOTLK ÔÇö ICC 25 H├®ro├»que	Bataille navale (HM)	0	1509632341952434342
WOTLK ÔÇö ICC 25 H├®ro├»que	Conseil des Princes de sang (HM)	0	1509632341952434342
WOTLK ÔÇö ICC 25 H├®ro├»que	Dame Murmemort (HM)	0	1509632341952434342
WOTLK ÔÇö ICC 25 H├®ro├»que	Le Roi-liche (HM)	0	1509632341952434342
WOTLK ÔÇö ICC 25 H├®ro├»que	Professeur Putricide (HM)	0	1509632341952434342
WOTLK ÔÇö ICC 25 H├®ro├»que	Pulentraille (HM)	0	1509632341952434342
WOTLK ÔÇö ICC 25 H├®ro├»que	Reine de Sang Lana'thel (HM)	0	1509632341952434342
WOTLK ÔÇö ICC 25 H├®ro├»que	Saurcroc le Jeune (HM)	0	1509632341952434342
WOTLK ÔÇö ICC 25 H├®ro├»que	Seigneur Gargamoelle (HM)	0	1509632341952434342
WOTLK ÔÇö ICC 25 H├®ro├»que	Sindragosa (HM)	0	1509632341952434342
WOTLK ÔÇö ICC 25 H├®ro├»que	Trognepus (HM)	0	1509632341952434342
WOTLK ÔÇö ICC 25 H├®ro├»que	Valithria Marcher├¬ve (HM)	0	1509632341952434342
WOTLK ÔÇö ICC 10 H├®ro├»que	Trognepus (HM)	1	1509632340878426112
WOTLK ÔÇö Naxxramas 10 Normal	Sapphiron	1	1509632264391233588
\.


--
-- Name: config config_pkey; Type: CONSTRAINT; Schema: public; Owner: sm_progression_db_user
--

ALTER TABLE ONLY public.config
    ADD CONSTRAINT config_pkey PRIMARY KEY (key);


--
-- Name: progression progression_pkey; Type: CONSTRAINT; Schema: public; Owner: sm_progression_db_user
--

ALTER TABLE ONLY public.progression
    ADD CONSTRAINT progression_pkey PRIMARY KEY (raid, boss);


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON SEQUENCES TO sm_progression_db_user;


--
-- Name: DEFAULT PRIVILEGES FOR TYPES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TYPES TO sm_progression_db_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON FUNCTIONS TO sm_progression_db_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES TO sm_progression_db_user;


--
-- PostgreSQL database dump complete
--

\unrestrict 6S9y4EZTuf1xT3iSdYA62t8gAQCaGP7R1FLhlbh7EmpFifYvxQOofMroDvCfw7e

