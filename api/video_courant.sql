-- phpMyAdmin SQL Dump
-- version 5.0.4deb2+deb11u1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : Dim 05 mai 2024 à 09:39
-- Version du serveur :  10.5.23-MariaDB-0+deb11u1
-- Version de PHP : 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `video_courant`
--

-- --------------------------------------------------------

--
-- Structure de la table `nb_video_jour`
--

CREATE TABLE `nb_video_jour` (
  `id_nb` varchar(100) DEFAULT NULL,
  `date_jour` datetime DEFAULT NULL,
  `id_objet_nb_video_jour` varchar(100) DEFAULT NULL,
  `nb_jouer` int(11) DEFAULT NULL,
  `temps_total` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `objets`
--

CREATE TABLE `objets` (
  `id_objet` varchar(100) DEFAULT NULL,
  `nom_objet` varchar(250) DEFAULT NULL,
  `local_objet` varchar(100) DEFAULT NULL,
  `is_localisation` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `video_objets`
--

CREATE TABLE `video_objets` (
  `id_video` varchar(100) DEFAULT NULL,
  `id_objet` varchar(100) DEFAULT NULL,
  `taille_video` int(11) DEFAULT NULL,
  `md5_video` varchar(250) DEFAULT NULL,
  `ordre` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
