--
-- Name: applications; Type: TABLE; Schema: public; Owner: fairnightzz
--

CREATE TABLE public.Applications (
    pkiApplicationId BIGINT IDENTITY(1,1) NOT NULL,
    fkiUserId BIGINT NOT NULL,
    sName NVARCHAR(30) NOT NULL,
    dtStartDate DATETIME NOT NULL,
    dtEndDate DATETIME NOT NULL,
    sDescription NVARCHAR(4000),
    sImageUrl NVARCHAR(200),
    sFormUrl NVARCHAR(200),
    fkiBootcampId INT DEFAULT 0
);

ALTER TABLE public.Applications ADD CONSTRAINT Applications_PK PRIMARY KEY(pkiApplicationId);
ALTER TABLE public.Applications ADD FOREIGN KEY (fkiUserId) REFERENCES public.users(pkiUserId);
CREATE NONCLUSTERED INDEX UNC_Applications_fkiUserId ON public.Applications (fkiUserId); 

--check table owner
--EXEC sp_table_privileges '<tableName>' 
--move ownership
--EXEC sp_changeobjectowner '<owner>.<tableName>', '<newOwner>'s

--
-- Name: bootcamps; Type: TABLE; Schema: public; Owner: fairnightzz
--

CREATE TABLE public.Bootcamps (
    pkiBootcampId BIGINT IDENTITY(0,1) NOT NULL,
    sBootcampName NVARCHAR(30) NOT NULL UNIQUE,
    dtStartDate DATETIME NOT NULL,
    dtEndDate DATETIME NOT NULL,
    sDescription NVARCHAR(4000),
    sImageUrl NVARCHAR(200),
    sDefaultZoomUrl NVARCHAR(200)
);

ALTER TABLE public.Applications ADD CONSTRAINT Bootcamps_PK PRIMARY KEY(pkiApplicationId);

--
-- Name: events; Type: TABLE; Schema: public; Owner: fairnightzz
--

CREATE TABLE public.Events (
    pkiEventId BIGINT IDENTITY(1,1) NOT NULL,
    sEventName NVARCHAR(30) NOT NULL,
    dtStartDate DATETIME NOT NULL,
    dtEndDate DATETIME NOT NULL,
    sDescription NVARCHAR(4000),
    sImageUrl NVARCHAR(200),
    sZoomUrl NVARCHAR(200),
    fkiBootcampId BIGINT DEFAULT 1
);

ALTER TABLE public.Events ADD CONSTRAINT Applications_PK PRIMARY KEY(iApplicationId);
ALTER TABLE public.Events ADD FOREIGN KEY (fkiBootcampId) REFERENCES public.Bootcamps(pkiBootcampId);
CREATE NONCLUSTERED INDEX UNC_Bootcamps_fkiBootcampId ON public.Applications (fkiBootcampId); 

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.Users (
    iUserId BIGINT IDENTITY(1,1) NOT NULL,
    bAdmin BIT DEFAULT 0 NOT NULL,
    sFirstName NVARCHAR(30) NOT NULL,
    sLastName NVARCHAR(30) NOT NULL,
    sSchool NVARCHAR(50) NOT NULL,
    sProgram NVARCHAR(50) NOT NULL,
    sYearOfStudy NVARCHAR(30)
);

ALTER TABLE public.Users ADD CONSTRAINT Users_PK PRIMARY KEY(iUserId);

-- ADD default bootcamp that is NULL

INSERT INTO public.Bootcamps VALUES(0, 'NULL', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL, NULL, NULL)

