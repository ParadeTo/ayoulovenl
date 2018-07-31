-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 2018-07-31 03:25:50
-- 服务器版本： 5.7.18
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ayoulovenl`
--

-- --------------------------------------------------------

--
-- 表的结构 `lottery`
--

CREATE TABLE `lottery` (
  `id` int(11) UNSIGNED NOT NULL,
  `openid` char(28) NOT NULL DEFAULT '',
  `prize` tinyint(3) UNSIGNED NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `message`
--

CREATE TABLE `message` (
  `id` int(11) UNSIGNED NOT NULL,
  `openid` char(28) NOT NULL DEFAULT '',
  `content` varchar(50) NOT NULL DEFAULT '',
  `create_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `message`
--

INSERT INTO `message` (`id`, `openid`, `content`, `create_at`) VALUES
(13, 'oz_7S5IDP-8lZTxZOxxwvUHpCTow', '来看傻子啦', '2018-06-06 00:03:34'),
(15, 'oz_7S5IDP-8lZTxZOxxwvUHpCTow', '为什么我这么帅', '2018-06-06 00:05:22'),
(16, 'oz_7S5IDP-8lZTxZOxxwvUHpCTow', '可口可乐了', '2018-06-06 21:02:50'),
(19, 'oz_7S5KrkXILpvsPxKcuOZ1eHUz4', '涂涂乐', '2018-06-06 21:12:54'),
(20, 'oz_7S5IDP-8lZTxZOxxwvUHpCTow', '啦啦啦啦啦啦啦', '2018-07-19 09:55:13'),
(21, 'oz_7S5Lm1u9s7X2sVPvJfUKU0AgA', '我是郭志远', '2018-07-19 10:13:08'),
(22, 'oz_7S5Lm1u9s7X2sVPvJfUKU0AgA', '哈哈哈', '2018-07-19 22:26:11'),
(23, 'oz_7S5FHAgVyySDjt-27EbO3X9po', '祝儿子儿媳百年好合', '2018-07-23 22:46:54'),
(24, 'oz_7S5FHAgVyySDjt-27EbO3X9po', '我是老卢', '2018-07-23 22:47:46'),
(25, 'oz_7S5FHAgVyySDjt-27EbO3X9po', '老卢来了', '2018-07-23 22:48:05'),
(26, 'oz_7S5ErjkHTxNN84FkJOIvvxuqA', '很', '2018-07-23 22:51:09'),
(27, 'oz_7S5ErjkHTxNN84FkJOIvvxuqA', '巨', '2018-07-23 22:52:05');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `openid` char(28) NOT NULL DEFAULT '',
  `nickname` varchar(30) DEFAULT '',
  `gender` tinyint(1) UNSIGNED NOT NULL DEFAULT '0',
  `language` varchar(10) DEFAULT '',
  `city` varchar(50) DEFAULT '',
  `province` varchar(50) DEFAULT '',
  `country` varchar(50) DEFAULT '',
  `avatar_url` varchar(200) NOT NULL DEFAULT '',
  `come` tinyint(1) UNSIGNED NOT NULL DEFAULT '0',
  `create_at` datetime NOT NULL,
  `update_at` datetime DEFAULT NULL,
  `message` tinyint(1) UNSIGNED NOT NULL DEFAULT '0' COMMENT '是否留过言'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`openid`, `nickname`, `gender`, `language`, `city`, `province`, `country`, `avatar_url`, `come`, `create_at`, `update_at`, `message`) VALUES
('oz_7S5ErjkHTxNN84FkJOIvvxuqA', '', 0, '', '', '', '', '', 0, '2018-07-23 22:51:09', '2018-07-23 22:52:05', 1),
('oz_7S5F2tjMh8t642pilLSeHrRwc', 'N.L', 2, 'zh_CN', 'Changsha', 'Hunan', 'China', 'https://wx.qlogo.cn/mmopen/vi_32/8d12367xXhjpV5pZHiaaaJLib7ChPBhGOoBuBkMdkKmIY7dUDwX4MVtbd6S5Ut1YFxBgy1DRSIophTTiamb53QOKQ/132', 1, '2018-06-05 23:52:26', '2018-06-06 00:04:51', 0),
('oz_7S5FHAgVyySDjt-27EbO3X9po', '过好每一天', 2, 'zh_CN', '', '', 'Iceland', 'https://wx.qlogo.cn/mmopen/vi_32/jhykFn9z1VrzA3lhrXxicFgtcpqptARMqhphzhxjP40eQmQF28rf0YM2KJCxmP0qob2ETstI8JuiaBSnaZ48382w/132', 1, '2018-07-23 22:46:54', '2018-07-23 22:47:17', 1),
('oz_7S5IDP-8lZTxZOxxwvUHpCTow', 'Aaaaaaaaaaayou', 1, 'zh_CN', 'Shenzhen', 'Guangdong', 'China', 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83erZljdMAn6HZaNv0IpO9ZMG7oZOmEgyiarF00zMoTXY6qa1rGNwJo8dUZW5EleC2o463veWHgGSic9g/132', 1, '2018-06-04 12:19:30', '2018-07-19 10:10:35', 1),
('oz_7S5KrkXILpvsPxKcuOZ1eHUz4', '陈小妮', 2, 'zh_CN', 'Shenzhen', 'Guangdong', 'China', 'https://wx.qlogo.cn/mmopen/vi_32/cccIlGK9d3UUibBUsk7jFcPTxfKQwFVklQbhUfLWicNGFp9dJaGaRcjpamyVQDhRFwq21nibFsXsyao6PlUcpNyGA/132', 0, '2018-06-06 21:12:26', '2018-06-06 21:12:33', 1),
('oz_7S5Lm1u9s7X2sVPvJfUKU0AgA', '郭大陆', 1, 'zh_CN', 'Shenzhen', 'Guangdong', 'China', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKlIyD40v167Rj4xHuxXmBKic1Nib8oGC37AzicZlCbia82bSI1R88ibtf7KhJ6W4HgmLrWdl83oR3Mhmg/132', 1, '2018-07-19 10:12:44', '2018-07-19 22:26:03', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `lottery`
--
ALTER TABLE `lottery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`openid`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `lottery`
--
ALTER TABLE `lottery`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
