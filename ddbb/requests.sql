-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 08, 2022 at 06:28 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `reflow`
--

-- --------------------------------------------------------

--
-- Table structure for table `requests`
--

CREATE TABLE `requests` (
  `request_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(256) NOT NULL,
  `description` varchar(512) NOT NULL,
  `type` varchar(64) NOT NULL,
  `year` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `json` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `requests`
--

INSERT INTO `requests` (`request_id`, `user_id`, `title`, `description`, `type`, `year`, `status`, `json`) VALUES
(2, 14, 'Title', 'Description', 'photos', 2022, 0, ''),
(5, 14, 'New room', 'for us', 'photos', 2022, 0, '{\"floorplan\":{\"corners\":{\"f90da5e3-9e0e-eba7-173d-eb0b071e838e\":{\"x\":204.85099999999989,\"y\":-23.875999999999976},\"da026c08-d76a-a944-8e7b-096b752da9ed\":{\"x\":316.61099999999954,\"y\":-23.875999999999976},\"4e3d65cb-54c0-0681-28bf-bddcc7bdb571\":{\"x\":316.61099999999954,\"y\":-739.14},\"71d4f128-ae80-3d58-9bd2-711c6ce6cdf2\":{\"x\":204.85099999999989,\"y\":-739.14}},\"walls\":[{\"corner1\":\"71d4f128-ae80-3d58-9bd2-711c6ce6cdf2\",\"corner2\":\"f90da5e3-9e0e-eba7-173d-eb0b071e838e\",\"frontTexture\":{\"url\":\"https://www.feldsparhomes.com:8001/assets/5f0dde8ee5148d0ef82ff069\",\"stretch\":true,\"scale\":0},\"backTexture\":{\"url\":\"https://www.feldsparhomes.com:8001/assets/5f0dde8ee5148d0ef82ff069\",\"stretch\":true,\"scale\":0}},{\"corner1\":\"f90da5e3-9e0e-eba7-173d-eb0b071e838e\",\"corner2\":\"da026c08-d76a-a944-8e7b-096b752da9ed\",\"frontTexture\":{\"url\":\"https://www.feldsparhomes.com:8001/assets/5f0dde8ee5148d0ef82ff069\",\"stretch\":true,\"scale\":0},\"backTexture\":{\"url\":\"https://www.feldsparhomes.com:8001/assets/5f0dde8ee5148d0ef82ff069\",\"stretch\":true,\"scale\":0}},{\"corner1\":\"da026c08-d76a-a944-8e7b-096b752da9ed\",\"corner2\":\"4e3d65cb-54c0-0681-28bf-bddcc7bdb571\",\"frontTexture\":{\"url\":\"https://www.feldsparhomes.com:8001/assets/5f0dde8ee5148d0ef82ff069\",\"stretch\":true,\"scale\":0},\"backTexture\":{\"url\":\"https://www.feldsparhomes.com:8001/assets/5f0dde8ee5148d0ef82ff069\",\"stretch\":true,\"scale\":0}},{\"corner1\":\"4e3d65cb-54c0-0681-28bf-bddcc7bdb571\",\"corner2\":\"71d4f128-ae80-3d58-9bd2-711c6ce6cdf2\",\"frontTexture\":{\"url\":\"https://www.feldsparhomes.com:8001/assets/5f0dde8ee5148d0ef82ff069\",\"stretch\":true,\"scale\":0},\"backTexture\":{\"url\":\"https://www.feldsparhomes.com:8001/assets/5f0dde8ee5148d0ef82ff069\",\"stretch\":true,\"scale\":0}}],\"wallTextures\":[],\"floorTextures\":{},\"newFloorTextures\":{}},\"items\":[{\"item_name\":\"Chair\",\"item_type\":1,\"model_url\":\"models/js/gus-churchchair-whiteoak.js\",\"xpos\":236.15020930466886,\"ypos\":39.47743068655714,\"zpos\":-248.9737147261319,\"rotation\":0,\"scale_x\":1,\"scale_y\":1,\"scale_z\":1,\"fixed\":false},{\"item_name\":\"Chair\",\"item_type\":1,\"model_url\":\"models/js/gus-churchchair-whiteoak.js\",\"xpos\":285.61671189501715,\"ypos\":39.47743068655714,\"zpos\":-250.50804124084075,\"rotation\":0,\"scale_x\":1,\"scale_y\":1,\"scale_z\":1,\"fixed\":false}]}');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `requests`
--
ALTER TABLE `requests`
  ADD PRIMARY KEY (`request_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `requests`
--
ALTER TABLE `requests`
  MODIFY `request_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
