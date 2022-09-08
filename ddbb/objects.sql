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
-- Table structure for table `objects`
--

CREATE TABLE `objects` (
  `object_id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  `description` varchar(128) NOT NULL,
  `brand` varchar(64) NOT NULL,
  `url` varchar(200) NOT NULL,
  `height` int(11) NOT NULL,
  `width` int(11) NOT NULL,
  `depth` int(11) NOT NULL,
  `image` varchar(128) NOT NULL,
  `price` int(11) NOT NULL,
  `type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `objects`
--

INSERT INTO `objects` (`object_id`, `name`, `description`, `brand`, `url`, `height`, `width`, `depth`, `image`, `price`, `type`) VALUES
(1, 'Eket', 'Armario Blanco', 'Ikea', 'models/js/untitled.js', 35, 35, 35, 'eket', 34, 1),
(2, 'Closed Door', 'Closed Door', '', 'models/js/closed-door28x80_baked.js', 0, 0, 0, 'models/thumbnails/thumbnail_Screen_Shot_2014-10-27_at_8.04.12_PM.png', 0, 7),
(3, 'Open Door', 'Open Door', '', 'models/js/open_door.js', 0, 0, 0, 'models/thumbnails/thumbnail_Screen_Shot_2014-10-27_at_8.22.46_PM.png', 0, 7),
(4, 'Window', 'Window', '', 'models/js/whitewindow.js', 0, 0, 0, 'models/thumbnails/thumbnail_window.png', 0, 3),
(5, 'Chair', 'Chair', '', 'models/js/gus-churchchair-whiteoak.js', 0, 0, 0, 'models/thumbnails/thumbnail_Church-Chair-oak-white_1024x1024.jpg', 0, 1),
(6, 'Red Chair', 'Red Chair', '', 'models/js/ik-ekero-orange_baked.js', 0, 0, 0, 'models/thumbnails/thumbnail_tn-orange.png', 0, 1),
(7, 'Blue Chair', 'Blue Chair', '', 'models/js/ik-ekero-blue_baked.js', 0, 0, 0, 'models/thumbnails/thumbnail_ekero-blue3.png', 0, 1),
(8, 'Dresser - Dark Wood', 'Dresser - Dark Wood', '', 'models/js/DWR_MATERA_DRESSER2.js', 0, 0, 0, 'models/thumbnails/thumbnail_matera_dresser_5.png', 0, 1),
(9, 'Dresser - White', 'Dresser - White', '', 'models/js/we-narrow6white_baked.js', 0, 0, 0, 'models/thumbnails/thumbnail_img25o.jpg', 0, 1),
(10, 'Bedside table - Shale', 'Bedside table - Shale', '', 'models/js/bd-shalebedside-smoke_baked.js', 0, 0, 0, 'models/thumbnails/thumbnail_Blu-Dot-Shale-Bedside-Table.jpg', 0, 1),
(11, 'Bedside table - White', 'Bedside table - White', '', 'models/js/cb-archnight-white_baked.js', 0, 0, 0, 'models/thumbnails/thumbnail_arch-white-oval-nightstand.jpg', 0, 1),
(12, 'Wardrobe - White', 'Wardrobe - White', '', 'models/js/ik-kivine_baked.js', 0, 0, 0, 'models/thumbnails/thumbnail_TN-ikea-kvikine.png', 0, 1),
(13, 'Full Bed', 'Full Bed', '', 'models/js/ik_nordli_full.js', 0, 0, 0, 'models/thumbnails/thumbnail_nordli-bed-frame__0159270_PE315708_S4.JPG', 0, 1),
(14, 'Bookshelf', 'Bookshelf', '', 'models/js/cb-kendallbookcasewalnut_baked.js', 0, 0, 0, 'models/thumbnails/thumbnail_kendall-walnut-bookcase.jpg', 0, 1),
(15, 'Media Console - White', 'Media Console - White', '', 'models/js/cb-clapboard_baked.js', 0, 0, 0, 'models/thumbnails/thumbnail_clapboard-white-60-media-console-1.jpg', 0, 1),
(16, 'Media Console - Black', 'Media Console - Black', '', 'models/js/cb-moore_baked.js', 0, 0, 0, 'models/thumbnails/thumbnail_moore-60-media-console-1.jpg', 0, 1),
(17, 'Sectional - Olive', 'Sectional - Olive', '', 'models/js/we-crosby2piece-greenbaked.js', 0, 0, 0, 'models/thumbnails/thumbnail_img21o.jpg', 0, 1),
(18, 'Sofa - Grey', 'Sofa - Grey', '', 'models/js/cb-rochelle-gray_baked.js', 0, 0, 0, 'models/thumbnails/thumbnail_rochelle-sofa-3.jpg', 0, 1),
(19, 'Wooden Trunk', 'Wooden Trunk', '', 'models/js/cb-tecs_baked.js', 0, 0, 0, 'models/thumbnails/thumbnail_teca-storage-trunk.jpg', 0, 1),
(20, 'Floor Lamp', 'Floor Lamp', '', 'models/js/ore-3legged-white_baked.js', 0, 0, 0, 'models/thumbnails/thumbnail_ore-white.png', 0, 1),
(21, 'Coffee Table - Wood', 'Coffee Table - Wood', '', 'models/js/ik-stockholmcoffee-brown.js', 0, 0, 0, 'models/thumbnails/thumbnail_stockholm-coffee-table__0181245_PE332924_S4.JPG', 0, 1),
(22, 'Side Table', 'Side Table', '', 'models/js/GUSossingtonendtable.js', 0, 0, 0, 'models/thumbnails/thumbnail_Screen_Shot_2014-02-21_at_1.24.58_PM.png', 0, 1),
(23, 'Dining Table', 'Dining Table', '', 'models/js/cb-scholartable_baked.js', 0, 0, 0, 'models/thumbnails/thumbnail_scholar-dining-table.jpg', 0, 1),
(24, 'Dining table', 'Dining table', '', 'models/js/BlakeAvenuejoshuatreecheftable.js', 0, 0, 0, 'models/thumbnails/thumbnail_Screen_Shot_2014-01-28_at_6.49.33_PM.png', 0, 1),
(25, 'Blue Rug', 'Blue Rug', '', 'models/js/cb-blue-block-60x96.js', 0, 0, 0, 'models/thumbnails/thumbnail_cb-blue-block60x96.png', 0, 8),
(26, 'NYC Poster', 'NYC Poster', '', 'models/js/nyc-poster2.js', 0, 0, 0, 'models/thumbnails/thumbnail_nyc2.jpg', 0, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `objects`
--
ALTER TABLE `objects`
  ADD PRIMARY KEY (`object_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `objects`
--
ALTER TABLE `objects`
  MODIFY `object_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
