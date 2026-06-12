-- phpMyAdmin SQL Dump
-- version 3.5.8.2
-- http://www.phpmyadmin.net
--
-- Host: md409.wedos.net:3306
-- Generation Time: May 05, 2026 at 09:45 PM
-- Server version: 10.4.34-MariaDB-log
-- PHP Version: 5.4.23

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `d344678_itharia`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `faction` enum('dwarfs','humans','avians','minotaurs') DEFAULT NULL,
  `oauth_provider` varchar(50) DEFAULT NULL,
  `oauth_id` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci AUTO_INCREMENT=47 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `role`, `faction`, `oauth_provider`, `oauth_id`, `created_at`) VALUES
(2, 'robert.hubinak@gmail.com', NULL, 'user', 'avians', NULL, NULL, '2025-08-20 14:48:06'),
(4, 'test@example.com', NULL, 'user', 'minotaurs', NULL, NULL, '2025-08-20 14:49:16'),
(5, 'test1@example.com', NULL, 'user', 'avians', NULL, NULL, '2025-08-20 21:33:21'),
(7, 'test2@example.com', NULL, 'user', '', NULL, NULL, '2025-08-20 21:38:56'),
(9, 'test3@example.com', NULL, 'user', 'avians', NULL, NULL, '2025-08-20 21:39:31'),
(12, 'test9@example.com', NULL, 'user', 'minotaurs', NULL, NULL, '2025-08-20 22:46:31'),
(13, 'tes4t@example.com', NULL, 'user', 'humans', NULL, NULL, '2025-08-20 22:46:42'),
(15, 'robert.hubina1k@gmail.com', NULL, 'user', 'avians', NULL, NULL, '2025-08-20 22:47:34'),
(17, 'test@1example.com', NULL, 'user', 'avians', NULL, NULL, '2025-08-20 22:51:11'),
(18, 'zolajonda@gmail.com', NULL, 'user', 'avians', NULL, NULL, '2025-08-21 06:37:45'),
(19, 'pedrozlzl30@gmail.com', NULL, 'user', '', NULL, NULL, '2025-08-21 07:09:12'),
(20, 'anjelo_meza_floyd@icloud.com', NULL, 'user', 'humans', NULL, NULL, '2025-08-21 13:58:05'),
(21, 'john163+itharia@gmx.de', NULL, 'user', 'humans', NULL, NULL, '2025-08-21 18:02:05'),
(23, 'tes1t@example.com', NULL, 'user', 'avians', NULL, NULL, '2025-08-22 20:07:34'),
(24, 'tominko.rinko@gmail.com', NULL, 'user', 'avians', NULL, NULL, '2025-08-25 16:51:28'),
(25, 'Joeyoosting@gmail.com', NULL, 'user', 'dwarfs', NULL, NULL, '2025-09-05 19:23:25'),
(26, 'Gabo.urban@gmail.com', NULL, 'user', 'dwarfs', NULL, NULL, '2025-09-10 20:28:15'),
(27, 'lio-park@naver.com', NULL, 'user', 'humans', NULL, NULL, '2025-09-18 08:45:14'),
(28, 'kalebraymond0@gmail.com', NULL, 'user', 'minotaurs', NULL, NULL, '2025-09-26 00:02:44'),
(41, 'elvisalusaj123@gmail.com', NULL, 'user', 'avians', NULL, NULL, '2025-11-04 07:07:58'),
(42, 'matekmart@yahoo.com', NULL, 'user', 'humans', NULL, NULL, '2025-11-20 18:42:14'),
(43, 'freyes0093@gmail.com', NULL, 'user', 'minotaurs', NULL, NULL, '2025-11-23 14:56:33'),
(44, 'Kharzan1@hotmail.com', NULL, 'user', 'dwarfs', NULL, NULL, '2025-11-27 10:30:20'),
(45, 'Hardcorerugby7@gmail.com', NULL, 'user', 'dwarfs', NULL, NULL, '2026-01-11 19:31:12'),
(46, 'paulquig@gmail.com', NULL, 'user', 'dwarfs', NULL, NULL, '2026-03-04 23:29:49');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
