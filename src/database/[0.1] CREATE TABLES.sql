--
-- Name: applications; Type: TABLE; Schema: public; Owner: fairnightzz
--


--USE [bolt-backend-db]
--GO
--CREATE SCHEMA dbo;


--check table owner
--EXEC sp_table_privileges '<tableName>' 
--move ownership
--EXEC sp_changeobjectowner '<owner>.<tableName>', '<newOwner>'s


IF OBJECT_ID(N'dbo.Applications', N'U') IS NOT NULL
DROP TABLE [dbo].[Applications]
GO  

IF OBJECT_ID(N'dbo.Events', N'U') IS NOT NULL
DROP TABLE [dbo].[Events]
GO 

IF OBJECT_ID(N'dbo.Bootcamps', N'U') IS NOT NULL
DROP TABLE [dbo].[Bootcamps]
GO 

IF OBJECT_ID(N'dbo.Users', N'U') IS NOT NULL
DROP TABLE [dbo].[Users]
GO

--
-- Name: bootcamps; Type: TABLE; Schema: dbo; Owner: fairnightzz
--

CREATE TABLE dbo.Bootcamps (
    pkiBootcampID BIGINT IDENTITY(0,1) NOT NULL,
    sBootcampName NVARCHAR(30) NOT NULL,
    dtStartDate DATETIME NOT NULL,
    dtEndDate DATETIME NOT NULL,
    sDescription NVARCHAR(4000),
    sImageUrl NVARCHAR(200),
    sDefaultZoomUrl NVARCHAR(200)
);


ALTER TABLE dbo.Bootcamps ADD CONSTRAINT PK_BootcampID PRIMARY KEY(pkiBootcampID);

-- ADD default bootcamp that is NULL

INSERT INTO dbo.Bootcamps VALUES('No Bootcamp', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL, NULL, NULL)


--
-- Name: events; Type: TABLE; Schema: dbo; Owner: fairnightzz
--


CREATE TABLE dbo.Events (
    pkiEventID BIGINT IDENTITY(1,1) NOT NULL,
    sEventName NVARCHAR(30) NOT NULL,
    dtStartDate DATETIME NOT NULL,
    dtEndDate DATETIME NOT NULL,
    sDescription NVARCHAR(4000),
    sImageUrl NVARCHAR(200),
    sZoomUrl NVARCHAR(200),
    fkiBootcampID BIGINT DEFAULT 0
);

ALTER TABLE dbo.Events ADD CONSTRAINT PK_EventID PRIMARY KEY(pkiEventID);
ALTER TABLE dbo.Events ADD FOREIGN KEY (fkiBootcampID) REFERENCES dbo.Bootcamps(pkiBootcampID);
CREATE NONCLUSTERED INDEX UNC_Events_fkiBootcampID ON dbo.Events (fkiBootcampID); 

--
-- Name: users; Type: TABLE; Schema: dbo; Owner: postgres
--

CREATE TABLE dbo.Users (
    pkiUserID BIGINT IDENTITY(1,1) NOT NULL,
    bAdmin BIT DEFAULT 0 NOT NULL,
    sFirstName NVARCHAR(30) NOT NULL,
    sLastName NVARCHAR(30) NOT NULL,
    sEmail NVARCHAR(100) UNIQUE NOT NULL,
    sSchool NVARCHAR(50) NOT NULL,
    sProgram NVARCHAR(50) NOT NULL,
    sYearOfStudy NVARCHAR(30)
);

ALTER TABLE dbo.Users ADD CONSTRAINT PK_UserID PRIMARY KEY(pkiUserID);

--
-- Name: applications; Type: TABLE; Schema: dbo; Owner: postgres
--

CREATE TABLE dbo.Applications (
    pkiApplicationID BIGINT IDENTITY(1,1) NOT NULL,
    fkiUserID BIGINT NOT NULL,
    sApplicationName NVARCHAR(30) NOT NULL,
    dtStartDate DATETIME NOT NULL,
    dtEndDate DATETIME NOT NULL,
    sDescription NVARCHAR(4000),
    sImageUrl NVARCHAR(200),
    sFormUrl NVARCHAR(200),
    fkiBootcampID INT DEFAULT 0,
    iNumApplicants INT DEFAULT 0
);

ALTER TABLE dbo.Applications ADD CONSTRAINT PK_ApplicationID PRIMARY KEY(pkiApplicationID);
ALTER TABLE dbo.Applications ADD FOREIGN KEY (fkiUserID) REFERENCES dbo.users(pkiUserID);
CREATE NONCLUSTERED INDEX UNC_Applications_fkiUserID ON dbo.Applications (fkiUserID); 
