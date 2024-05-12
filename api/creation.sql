CREATE TABLE objets(
    id_objet VARCHAR(100) NOT NULL,
    nom_objet VARCHAR(150),
    local_objet VARCHAR(100),
    is_localisation boolean,
    PRIMARY KEY (id_objet)
);

CREATE TABLE video_objets(
    id_video VARCHAR(100) NOT NULL,
    id_objet VARCHAR(100),
    taille_video INTEGER,
    md5_video VARCHAR(250),
    ordre INTEGER,
    PRIMARY KEY (id_video)
);

CREATE TABLE nb_video_jour(
    id_nb VARCHAR(100) NOT NULL,
    date_jour DATETIME,
    id_objet_nb_video_jour VARCHAR(100),
    nb_jouer INTEGER,
    temps_total INTEGER,
    PRIMARY KEY (id_nb)
);

