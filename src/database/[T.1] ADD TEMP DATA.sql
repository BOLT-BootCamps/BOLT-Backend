
INSERT INTO dbo.Users (
    bAdmin,
    sFirstName,
    sLastName,
    sEmail,
    sSchool,
    sProgram,
    sYearOfStudy
) VALUES (
    0,
    'NULL',
    'NULL',
    'NULL',
    'NULL',
    'NULL',
    'NULL'
);

INSERT INTO dbo.Applications (
    fkiUserID,
    sApplicationName,
    dtStartDate,
    dtEndDate,
    sDescription,
    sImageUrl,
    sFormUrl
) VALUES
(
    1,
    'NULL',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    'NULL',
    'NULL',
    'NULL'
);