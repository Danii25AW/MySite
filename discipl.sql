/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 50719
 Source Host           : localhost:3306
 Source Schema         : discipl

 Target Server Type    : MySQL
 Target Server Version : 50719
 File Encoding         : 65001

 Date: 28/01/2019 02:45:13
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for discipl_migration
-- ----------------------------
DROP TABLE IF EXISTS `discipl_migration`;
CREATE TABLE `discipl_migration`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_discipl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id_task` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of discipl_migration
-- ----------------------------
INSERT INTO `discipl_migration` VALUES (1, '1', '1');
INSERT INTO `discipl_migration` VALUES (2, '1', '2');

-- ----------------------------
-- Table structure for discipl_tasks
-- ----------------------------
DROP TABLE IF EXISTS `discipl_tasks`;
CREATE TABLE `discipl_tasks`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `lesson_time` int(255) NOT NULL DEFAULT 0,
  `lab_time` int(255) NOT NULL DEFAULT 0,
  `practice_time` int(255) NOT NULL DEFAULT 0,
  `work_time` int(255) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of discipl_tasks
-- ----------------------------
INSERT INTO `discipl_tasks` VALUES (1, 'Основы информатики', 10, 20, 10, 10);
INSERT INTO `discipl_tasks` VALUES (2, 'Алгоритмы', 120, 3, 20, 5);
INSERT INTO `discipl_tasks` VALUES (5, 'sdc', 23, 2, 2, 2);

-- ----------------------------
-- Table structure for disciplines
-- ----------------------------
DROP TABLE IF EXISTS `disciplines`;
CREATE TABLE `disciplines`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of disciplines
-- ----------------------------
INSERT INTO `disciplines` VALUES (1, 'Информатика');
INSERT INTO `disciplines` VALUES (7, 'asd');

SET FOREIGN_KEY_CHECKS = 1;
