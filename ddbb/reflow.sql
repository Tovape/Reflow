-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 26, 2022 at 06:07 PM
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
  `type` int(11) NOT NULL,
  `category` int(11) NOT NULL,
  `color` varchar(128) NOT NULL,
  `class` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `objects`
--

INSERT INTO `objects` (`object_id`, `name`, `description`, `brand`, `url`, `height`, `width`, `depth`, `image`, `price`, `type`, `category`, `color`, `class`) VALUES
(2, 'Closed Door', 'Closed Door', 'Generic', 'models/js/generic/generic_closed_door.js', 0, 0, 0, 'models/thumbnails/generic/generic_closed_door.jpg', 0, 7, 5, '', ''),
(3, 'Open Door', 'Open Door', 'Generic', 'models/js/generic/generic_open_door.js', 0, 0, 0, 'models/thumbnails/generic/generic_open_door.jpg', 0, 7, 5, '', ''),
(4, 'Window', 'Window', 'Generic', 'models/js/generic/generic_window.js', 0, 0, 0, 'models/thumbnails/generic/generic_window.jpg', 0, 3, 4, '', ''),
(5, 'Chair', 'Chair', 'Generic', 'models/js/generic/gus-churchchair-whiteoak.js', 0, 0, 0, 'models/thumbnails/generic/thumbnail_Church-Chair-oak-white_1024x1024.jpg', 0, 1, 1, '', ''),
(6, 'Red Chair', 'Red Chair', 'Ikea', 'models/js/ikea/ikea_ekero_orange.js', 75, 70, 73, 'models/thumbnails/ikea/ikea_ekero_orange.jpg', 180, 1, 1, 'Orange', 'Chairs'),
(7, 'Blue Chair', 'Blue Chair', 'Ikea', 'models/js/ikea/ikea_ekero_blue.js', 75, 70, 73, 'models/thumbnails/ikea/ikea_ekero_blue.jpg', 180, 1, 1, 'Blue', 'Chairs'),
(8, 'Dresser - Dark Wood', 'Dresser - Dark Wood', 'Generic', 'models/js/generic/DWR_MATERA_DRESSER2.js', 0, 0, 0, 'models/thumbnails/generic/thumbnail_matera_dresser_5.png', 0, 1, 1, '', ''),
(9, 'Dresser - White', 'Dresser - White', 'Generic', 'models/js/generic/we-narrow6white_baked.js', 0, 0, 0, 'models/thumbnails/generic/thumbnail_img25o.jpg', 0, 1, 1, '', ''),
(10, 'Bedside table - Shale', 'Bedside table - Shale', 'Generic', 'models/js/generic/bd-shalebedside-smoke_baked.js', 0, 0, 0, 'models/thumbnails/generic/thumbnail_Blu-Dot-Shale-Bedside-Table.jpg', 0, 1, 1, '', ''),
(11, 'Bedside table - White', 'Bedside table - White', 'Generic', 'models/js/generic/cb-archnight-white_baked.js', 0, 0, 0, 'models/thumbnails/generic/thumbnail_arch-white-oval-nightstand.jpg', 0, 1, 1, '', ''),
(12, 'Wardrobe - White', 'Wardrobe - White', 'Ikea', 'models/js/ikea/ikea_kvikine.js', 0, 0, 0, 'models/thumbnails/ikea/ikea_kvikine.jpg', 0, 1, 1, '', ''),
(13, 'Full Bed', 'Full Bed', 'Generic', 'models/js/generic/ik_nordli_full.js', 0, 0, 0, 'models/thumbnails/generic/thumbnail_nordli-bed-frame__0159270_PE315708_S4.JPG', 0, 1, 1, '', ''),
(14, 'Bookshelf', 'Bookshelf', 'Generic', 'models/js/generic/cb-kendallbookcasewalnut_baked.js', 0, 0, 0, 'models/thumbnails/generic/thumbnail_kendall-walnut-bookcase.jpg', 0, 1, 1, '', ''),
(15, 'Media Console - White', 'Media Console - White', 'Generic', 'models/js/generic/cb-clapboard_baked.js', 0, 0, 0, 'models/thumbnails/generic/thumbnail_clapboard-white-60-media-console-1.jpg', 0, 1, 1, '', ''),
(16, 'Media Console - Black', 'Media Console - Black', 'Generic', 'models/js/generic/cb-moore_baked.js', 0, 0, 0, 'models/thumbnails/generic/thumbnail_moore-60-media-console-1.jpg', 0, 1, 1, '', ''),
(17, 'Sectional - Olive', 'Sectional - Olive', 'Generic', 'models/js/generic/we-crosby2piece-greenbaked.js', 0, 0, 0, 'models/thumbnails/generic/thumbnail_img21o.jpg', 0, 1, 1, '', ''),
(18, 'Sofa - Grey', 'Sofa - Grey', 'Generic', 'models/js/generic/cb-rochelle-gray_baked.js', 0, 0, 0, 'models/thumbnails/generic/thumbnail_rochelle-sofa-3.jpg', 0, 1, 1, '', ''),
(19, 'Wooden Trunk', 'Wooden Trunk', 'Generic', 'models/js/generic/cb-tecs_baked.js', 0, 0, 0, 'models/thumbnails/generic/thumbnail_teca-storage-trunk.jpg', 0, 1, 1, '', ''),
(20, 'Floor Lamp', 'Floor Lamp', 'Generic', 'models/js/generic/ore-3legged-white_baked.js', 0, 0, 0, 'models/thumbnails/generic/thumbnail_ore-white.png', 0, 1, 3, '', ''),
(21, 'Coffee Table - Wood', 'Coffee Table - Wood', 'Ikea', 'models/js/ikea/ikea_stockholm.js', 40, 59, 180, 'models/thumbnails/ikea/ikea_stockholm.jpg', 330, 1, 1, 'Brown', 'Tables'),
(22, 'Side Table', 'Side Table', 'Generic', 'models/js/generic/GUSossingtonendtable.js', 0, 0, 0, 'models/thumbnails/generic/thumbnail_Screen_Shot_2014-02-21_at_1.24.58_PM.png', 0, 1, 1, '', ''),
(23, 'Dining Table', 'Dining Table', 'Generic', 'models/js/generic/cb-scholartable_baked.js', 0, 0, 0, 'models/thumbnails/generic/thumbnail_scholar-dining-table.jpg', 0, 1, 1, '', ''),
(24, 'Dining table', 'Dining table', 'Generic', 'models/js/generic/BlakeAvenuejoshuatreecheftable.js', 0, 0, 0, 'models/thumbnails/generic/thumbnail_Screen_Shot_2014-01-28_at_6.49.33_PM.png', 0, 1, 1, '', ''),
(25, 'Blue Rug', 'Blue Rug', 'Generic', 'models/js/generic/cb-blue-block-60x96.js', 0, 0, 0, 'models/thumbnails/generic/thumbnail_cb-blue-block60x96.png', 0, 8, 2, '', ''),
(26, 'NYC Poster', 'NYC Poster', 'Generic', 'models/js/generic/nyc-poster2.js', 0, 0, 0, 'models/thumbnails/generic/thumbnail_nyc2.jpg', 0, 2, 2, '', ''),
(29, 'Poang', 'Comfortable armchair, rests with wooden texture', 'Ikea', 'models/js/ikea/ikea_poang.js', 100, 68, 83, 'models/thumbnails/ikea/ikea_poang.jpg', 90, 1, 1, '', ''),
(30, 'Tullsta', 'Made of fabric and wood', 'Ikea', 'models/js/ikea/ikea_tullsta.js', 78, 80, 72, 'models/thumbnails/ikea/ikea_tullsta.jpg', 150, 1, 1, '', ''),
(31, 'Vibbyn', 'Metal Light Brown Silver', 'Ikea', 'models/js/ikea/ikea_vibbyn.js', 74, 69, 71, 'models/thumbnails/ikea/ikea_vibbyn.jpg', 150, 1, 1, '', ''),
(32, 'Ektorp', 'Fabric, wood', 'Ikea', 'models/js/ikea/ikea_ektorp.js', 80, 80, 80, 'models/thumbnails/ikea/ikea_ektorp.jpg', 300, 1, 1, '', ''),
(33, 'Emmabo', '', 'Ikea', 'models/js/ikea/ikea_emmabo.js', 72, 60, 99, 'models/thumbnails/ikea/ikea_emmabo.jpg', 100, 1, 1, '', ''),
(35, 'Grankulla', '', 'Ikea', 'models/js/ikea/ikea_grankulla.js', 80, 70, 110, 'models/thumbnails/ikea/ikea_grankulla.jpg', 70, 1, 1, '', ''),
(36, 'Karlstad', 'Fabric', 'Ikea', 'models/js/ikea/ikea_karlstad.js', 80, 90, 186, 'models/thumbnails/ikea/ikea_karlstad.jpg', 100, 1, 1, '', ''),
(37, 'Hemnes 3', 'Wood', 'Ikea', 'models/js/ikea/ikea_hemnes_3.js', 110, 97, 51, 'models/thumbnails/ikea/ikea_hemnes_3.jpg', 250, 1, 1, '', ''),
(38, 'Alex White 6 with wheels', 'Plastic and Wood', 'Ikea', 'models/js/ikea/ikea_alex_white_6_wheels.js', 66, 67, 48, 'models/thumbnails/ikea/ikea_alex_white_6_wheels.jpg', 180, 1, 1, 'White', 'Storage'),
(39, 'Alex Blue 6 with wheels', 'Plastic and Wood', 'Ikea', 'models/js/ikea/ikea_alex_blue_6_wheels.js', 66, 67, 48, 'models/thumbnails/ikea/ikea_alex_blue_6_wheels.jpg', 180, 1, 1, 'Blue', 'Storage'),
(40, 'Alex Wood 6 with wheels', 'Plastic and Wood', 'Ikea', 'models/js/ikea/ikea_alex_wood_6_wheels.js', 66, 67, 48, 'models/thumbnails/ikea/ikea_alex_wood_6_wheels.jpg', 180, 1, 1, 'Wood', 'Storage'),
(41, 'Alex Wood 5 with wheels', 'Plastic and Wood', 'Ikea', 'models/js/ikea/ikea_alex_wood_5_wheels.js', 76, 36, 58, 'models/thumbnails/ikea/ikea_alex_wood_5_wheels.jpg', 100, 1, 1, 'Wood', 'Storage'),
(42, 'Alex White 5 with wheels', 'Plastic and Wood', 'Ikea', 'models/js/ikea/ikea_alex_white_5_wheels.js', 76, 36, 58, 'models/thumbnails/ikea/ikea_alex_white_5_wheels.jpg', 100, 1, 1, 'White', 'Storage'),
(43, 'Alex Blue 5 with wheels', 'Plastic and Wood', 'Ikea', 'models/js/ikea/ikea_alex_blue_5_wheels.js', 76, 36, 58, 'models/thumbnails/ikea/ikea_alex_blue_5_wheels.jpg', 100, 1, 1, 'Blue', 'Storage'),
(44, 'Alex Blue 5', 'Plastic and Wood', 'Ikea', 'models/js/ikea/ikea_alex_blue_5.js', 70, 36, 58, 'models/thumbnails/ikea/ikea_alex_blue_5.jpg', 88, 1, 1, 'Blue', 'Storage'),
(45, 'Alex White 5', 'Plastic and Wood', 'Ikea', 'models/js/ikea/ikea_alex_white_5.js', 70, 36, 58, 'models/thumbnails/ikea/ikea_alex_white_5.jpg', 88, 1, 1, 'White', 'Storage'),
(46, 'Alex Black 5', 'Plastic and Wood', 'Ikea', 'models/js/ikea/ikea_alex_black_5.js', 70, 36, 58, 'models/thumbnails/ikea/ikea_alex_black_5.jpg', 88, 1, 1, 'Black', 'Storage'),
(47, 'Alex Wood 5', 'Plastic and Wood', 'Ikea', 'models/js/ikea/ikea_alex_wood_5.js', 70, 36, 58, 'models/thumbnails/ikea/ikea_alex_wood_5.jpg', 88, 1, 1, 'Wood', 'Storage'),
(48, 'Alex Wood 9', 'Plastic and Wood', 'Ikea', 'models/js/ikea/ikea_alex_wood_9.js', 116, 36, 48, 'models/thumbnails/ikea/ikea_alex_wood_9.jpg', 150, 1, 1, 'Wood', 'Storage'),
(49, 'Alex White 9', 'Plastic and Wood', 'Ikea', 'models/js/ikea/ikea_alex_white_9.js', 116, 36, 48, 'models/thumbnails/ikea/ikea_alex_white_9.jpg', 150, 1, 1, 'White', 'Storage'),
(50, 'Alex Blue 9', 'Plastic and Wood', 'Ikea', 'models/js/ikea/ikea_alex_blue_9.js', 116, 36, 48, 'models/thumbnails/ikea/ikea_alex_blue_9.jpg', 150, 1, 1, 'Blue', 'Storage'),
(53, 'Malm', 'Comoda 3 cajones', 'Ikea', 'models/js/ikea/ikea_malm_white.js', 78, 80, 48, 'models/thumbnails/ikea/ikea_malm_white.jpg', 85, 1, 1, 'White', 'Storage'),
(54, 'Malm', 'Comoda 3 cajones', 'Ikea', 'models/js/ikea/ikea_malm_wood.js', 78, 80, 48, 'models/thumbnails/ikea/ikea_malm_wood.jpg', 85, 1, 1, 'Wood', 'Storage'),
(55, 'Malm', 'Comoda 3 cajones', 'Ikea', 'models/js/ikea/ikea_malm_gray.js', 78, 80, 48, 'models/thumbnails/ikea/ikea_malm_gray.jpg', 85, 1, 1, 'Gray', 'Storage'),
(56, 'Malm', 'Comoda 3 cajones', 'Ikea', 'models/js/ikea/ikea_malm_black.js', 78, 80, 48, 'models/thumbnails/ikea/ikea_malm_black.jpg', 85, 1, 1, 'Black', 'Storage'),
(57, 'Table 2', 'Wooden Table', 'Generic', 'models/js/generic/generic_table_2.js', 44, 100, 70, '', 0, 1, 1, 'Wood', 'Tables');

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
  `json` longtext NOT NULL,
  `objectsjson` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `requests`
--

INSERT INTO `requests` (`request_id`, `user_id`, `title`, `description`, `type`, `year`, `status`, `json`, `objectsjson`) VALUES
(7, 17, 'tester', 'Description', 'photos', 2022, 0, '{\"floorplan\":{\"corners\":{\"56d9ebd1-91b2-875c-799d-54b3785fca1f\":{\"x\":630.555,\"y\":-227.58400000000006},\"8f4a050d-e102-3c3f-5af9-3d9133555d76\":{\"x\":294.64,\"y\":-227.58400000000006},\"4e312eca-6c4f-30d1-3d9a-a19a9d1ee359\":{\"x\":294.64,\"y\":232.664},\"254656bf-8a53-3987-c810-66b349f49b19\":{\"x\":745.7439999999998,\"y\":232.664},\"11d25193-4411-fbbf-78cb-ae7c0283164b\":{\"x\":1044.7019999999998,\"y\":232.664},\"edf0de13-df9f-cd6a-7d11-9bd13c36ce12\":{\"x\":1044.7019999999998,\"y\":-105.66399999999999},\"e7db8654-efe1-bda2-099a-70585874d8c0\":{\"x\":745.7439999999998,\"y\":-105.66399999999999}},\"walls\":[{\"corner1\":\"4e312eca-6c4f-30d1-3d9a-a19a9d1ee359\",\"corner2\":\"254656bf-8a53-3987-c810-66b349f49b19\",\"frontTexture\":{\"url\":\"rooms/textures/wallmap.png\",\"stretch\":true,\"scale\":0},\"backTexture\":{\"url\":\"https://blueprint-dev.s3.amazonaws.com/uploads/floor_wall_texture/file/wallmap_yellow.png\",\"stretch\":true,\"scale\":null}},{\"corner1\":\"254656bf-8a53-3987-c810-66b349f49b19\",\"corner2\":\"e7db8654-efe1-bda2-099a-70585874d8c0\",\"frontTexture\":{\"url\":\"rooms/textures/wallmap.png\",\"stretch\":true,\"scale\":0},\"backTexture\":{\"url\":\"https://blueprint-dev.s3.amazonaws.com/uploads/floor_wall_texture/file/wallmap_yellow.png\",\"stretch\":true,\"scale\":null}},{\"corner1\":\"56d9ebd1-91b2-875c-799d-54b3785fca1f\",\"corner2\":\"8f4a050d-e102-3c3f-5af9-3d9133555d76\",\"frontTexture\":{\"url\":\"rooms/textures/wallmap.png\",\"stretch\":true,\"scale\":0},\"backTexture\":{\"url\":\"https://blueprint-dev.s3.amazonaws.com/uploads/floor_wall_texture/file/wallmap_yellow.png\",\"stretch\":true,\"scale\":null}},{\"corner1\":\"8f4a050d-e102-3c3f-5af9-3d9133555d76\",\"corner2\":\"4e312eca-6c4f-30d1-3d9a-a19a9d1ee359\",\"frontTexture\":{\"url\":\"rooms/textures/wallmap.png\",\"stretch\":true,\"scale\":0},\"backTexture\":{\"url\":\"https://blueprint-dev.s3.amazonaws.com/uploads/floor_wall_texture/file/wallmap_yellow.png\",\"stretch\":true,\"scale\":null}},{\"corner1\":\"254656bf-8a53-3987-c810-66b349f49b19\",\"corner2\":\"11d25193-4411-fbbf-78cb-ae7c0283164b\",\"frontTexture\":{\"url\":\"rooms/textures/wallmap.png\",\"stretch\":true,\"scale\":0},\"backTexture\":{\"url\":\"rooms/textures/wallmap.png\",\"stretch\":true,\"scale\":0}},{\"corner1\":\"11d25193-4411-fbbf-78cb-ae7c0283164b\",\"corner2\":\"edf0de13-df9f-cd6a-7d11-9bd13c36ce12\",\"frontTexture\":{\"url\":\"rooms/textures/wallmap.png\",\"stretch\":true,\"scale\":0},\"backTexture\":{\"url\":\"https://blueprint-dev.s3.amazonaws.com/uploads/floor_wall_texture/file/light_brick.jpg\",\"stretch\":false,\"scale\":100}},{\"corner1\":\"edf0de13-df9f-cd6a-7d11-9bd13c36ce12\",\"corner2\":\"e7db8654-efe1-bda2-099a-70585874d8c0\",\"frontTexture\":{\"url\":\"rooms/textures/wallmap.png\",\"stretch\":true,\"scale\":0},\"backTexture\":{\"url\":\"rooms/textures/wallmap.png\",\"stretch\":true,\"scale\":0}},{\"corner1\":\"e7db8654-efe1-bda2-099a-70585874d8c0\",\"corner2\":\"56d9ebd1-91b2-875c-799d-54b3785fca1f\",\"frontTexture\":{\"url\":\"rooms/textures/wallmap.png\",\"stretch\":true,\"scale\":0},\"backTexture\":{\"url\":\"https://blueprint-dev.s3.amazonaws.com/uploads/floor_wall_texture/file/wallmap_yellow.png\",\"stretch\":true,\"scale\":null}}],\"wallTextures\":[],\"floorTextures\":{},\"newFloorTextures\":{\"11d25193-4411-fbbf-78cb-ae7c0283164b,254656bf-8a53-3987-c810-66b349f49b19,e7db8654-efe1-bda2-099a-70585874d8c0,edf0de13-df9f-cd6a-7d11-9bd13c36ce12\":{\"url\":\"https://blueprint-dev.s3.amazonaws.com/uploads/floor_wall_texture/file/light_fine_wood.jpg\",\"scale\":300}}},\"items\":[{\"item_name\":\"Open Door\",\"item_type\":7,\"model_url\":\"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/174/open_door.js\",\"xpos\":745.2440185546875,\"ypos\":110.5,\"zpos\":64.8291839065202,\"rotation\":-1.5707963267948966,\"scale_x\":1.7003089598352215,\"scale_y\":0.997292171703541,\"scale_z\":0.999415040540576,\"fixed\":false},{\"item_name\":\"Window\",\"item_type\":3,\"model_url\":\"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/165/whitewindow.js\",\"xpos\":886.8841174461031,\"ypos\":139.1510114697785,\"zpos\":-105.16400146484375,\"rotation\":0,\"scale_x\":1,\"scale_y\":1,\"scale_z\":1,\"fixed\":false},{\"item_name\":\"Bedside table - White\",\"item_type\":1,\"model_url\":\"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/353/cb-archnight-white_baked.js\",\"xpos\":1001.0862865204286,\"ypos\":31.15939942141,\"zpos\":86.4297300551338,\"rotation\":-0.7872847644705953,\"scale_x\":1,\"scale_y\":1,\"scale_z\":1,\"fixed\":false},{\"item_name\":\"Blue Rug\",\"item_type\":8,\"model_url\":\"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/440/cb-blue-block-60x96.js\",\"xpos\":905.8690190229256,\"ypos\":0.25000500000000003,\"zpos\":44.59927303228528,\"rotation\":-1.5707963267948966,\"scale_x\":1,\"scale_y\":1,\"scale_z\":1,\"fixed\":false},{\"item_name\":\"NYC Poster\",\"item_type\":2,\"model_url\":\"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/77/nyc-poster2.js\",\"xpos\":1038.448276049687,\"ypos\":146.22618581237782,\"zpos\":148.65033715350484,\"rotation\":-1.5707963267948966,\"scale_x\":1,\"scale_y\":1,\"scale_z\":1,\"fixed\":false},{\"item_name\":\"Dresser - White\",\"item_type\":1,\"model_url\":\"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/478/we-narrow6white_baked.js\",\"xpos\":898.0548281668393,\"ypos\":35.611997646165,\"zpos\":201.10860458067486,\"rotation\":-3.141592653589793,\"scale_x\":1,\"scale_y\":1,\"scale_z\":1,\"fixed\":false},{\"item_name\":\"Media Console - White\",\"item_type\":1,\"model_url\":\"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/400/cb-clapboard_baked.js\",\"xpos\":658.6568227980731,\"ypos\":67.88999754395999,\"zpos\":-141.50237235990153,\"rotation\":-0.8154064090423808,\"scale_x\":1,\"scale_y\":1,\"scale_z\":1,\"fixed\":false},{\"item_name\":\"Coffee Table - Wood\",\"item_type\":1,\"model_url\":\"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/68/ik-stockholmcoffee-brown.js\",\"xpos\":468.479104587435,\"ypos\":24.01483158034958,\"zpos\":-23.468458996048412,\"rotation\":1.5707963267948966,\"scale_x\":1,\"scale_y\":1,\"scale_z\":1,\"fixed\":false},{\"item_name\":\"Red Chair\",\"item_type\":1,\"model_url\":\"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/723/ik-ekero-orange_baked.js\",\"xpos\":397.676038151142,\"ypos\":37.50235073007,\"zpos\":156.31701312594373,\"rotation\":2.4062972386507093,\"scale_x\":1,\"scale_y\":1,\"scale_z\":1,\"fixed\":false},{\"item_name\":\"Window\",\"item_type\":3,\"model_url\":\"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/165/whitewindow.js\",\"xpos\":534.9620937975317,\"ypos\":137.60931398864443,\"zpos\":-227.08399963378906,\"rotation\":0,\"scale_x\":1,\"scale_y\":1,\"scale_z\":1,\"fixed\":false},{\"item_name\":\"Bookshelf\",\"item_type\":1,\"model_url\":\"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/388/cb-kendallbookcasewalnut_baked.js\",\"xpos\":533.1460416453955,\"ypos\":92.17650034119151,\"zpos\":207.7644213268835,\"rotation\":3.141592653589793,\"scale_x\":1,\"scale_y\":1,\"scale_z\":1,\"fixed\":false},{\"item_name\":\"Closed Door\",\"item_type\":7,\"model_url\":\"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/617/closed-door28x80_baked.js\",\"xpos\":637.2176377788675,\"ypos\":110.80000022010701,\"zpos\":232.16400146484375,\"rotation\":3.141592653589793,\"scale_x\":1,\"scale_y\":1,\"scale_z\":1,\"fixed\":false},{\"item_name\":\"Sofa - Grey\",\"item_type\":1,\"model_url\":\"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/596/cb-rochelle-gray_baked.js\",\"xpos\":356.92671999154373,\"ypos\":42.54509923821,\"zpos\":-21.686174295784554,\"rotation\":1.5707963267948966,\"scale_x\":1,\"scale_y\":1,\"scale_z\":1,\"fixed\":false},{\"item_name\":\"Floor Lamp\",\"item_type\":1,\"model_url\":\"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/614/ore-3legged-white_baked.js\",\"xpos\":346.697102333121,\"ypos\":72.163997943445,\"zpos\":-175.19915302127583,\"rotation\":0,\"scale_x\":1,\"scale_y\":1,\"scale_z\":1,\"fixed\":false},{\"item_name\":\"Window\",\"item_type\":3,\"model_url\":\"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/165/whitewindow.js\",\"xpos\":295.1400146484375,\"ypos\":141.43383044055196,\"zpos\":123.2280598724867,\"rotation\":1.5707963267948966,\"scale_x\":1,\"scale_y\":1,\"scale_z\":1,\"fixed\":false},{\"item_name\":\"Window\",\"item_type\":3,\"model_url\":\"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/165/whitewindow.js\",\"xpos\":374.7738207971076,\"ypos\":138.62749831597068,\"zpos\":-227.08399963378906,\"rotation\":0,\"scale_x\":1,\"scale_y\":1,\"scale_z\":1,\"fixed\":false},{\"item_name\":\"Full Bed\",\"item_type\":1,\"model_url\":\"https://blueprint-dev.s3.amazonaws.com/uploads/item_model/model/39/ik_nordli_full.js\",\"xpos\":939.5525544513545,\"ypos\":50,\"zpos\":-15.988409993966997,\"rotation\":-1.5707963267948966,\"scale_x\":1,\"scale_y\":1,\"scale_z\":1,\"fixed\":false}]}', '[]'),
(9, 14, 'Title', 'Description', 'photos', 2022, 0, '', '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(128) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(64) DEFAULT NULL,
  `timestamp` varchar(128) NOT NULL,
  `admin` int(11) NOT NULL,
  `region` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `timestamp`, `admin`, `region`) VALUES
(14, 'Tovape', 'tonivalverde0@gmail.com', '$2b$10$GZ9j4tznnM95qjWEody0aOKw/0evtlBUwueThiTksNsBX2J6aThSe', '1657209587536', 1, ''),
(17, 'test', 'test@test.com', '$2b$10$WTx1sVMkwW.Uuck/mOxgTuyHneDtxmppET8..ykwY6NQXJFut4CbC', '1664734275734', 0, '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `objects`
--
ALTER TABLE `objects`
  ADD PRIMARY KEY (`object_id`);

--
-- Indexes for table `requests`
--
ALTER TABLE `requests`
  ADD PRIMARY KEY (`request_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `objects`
--
ALTER TABLE `objects`
  MODIFY `object_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `requests`
--
ALTER TABLE `requests`
  MODIFY `request_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
