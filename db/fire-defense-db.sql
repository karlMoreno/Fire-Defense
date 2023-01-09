CREATE TABLE FireDefenseDB (
    PlayerID int NOT NULL AUTO_INCREMENT,
    PlayerName varchar(255),
    Score int,
    PRIMARY KEY (PlayerID)
);


INSERT INTO FireDefenseDB (PlayerName, Score) VALUES ('NPC', 0);