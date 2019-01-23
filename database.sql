-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le :  sam. 20 oct. 2018 à 14:58
-- Version du serveur :  5.6.38
-- Version de PHP :  7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données :  `maturity`
--

-- --------------------------------------------------------

--
-- Structure de la table `campagnes`
--

CREATE TABLE `campagnes` (
  `id_camp` integer UNSIGNED NOT NULL,
  `date_camp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'date création campagne',
  `nom_camp` varchar(40) NOT NULL,
  `id_ft_camp` integer UNSIGNED DEFAULT NULL,
  `statut_camp` integer NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `feature_team`
--

CREATE TABLE `feature_team` (
  `id_ft` integer UNSIGNED NOT NULL,
  `nom_ft` varchar(40) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `feature_team`
--

INSERT INTO `feature_team` (`id_ft`, `nom_ft`) VALUES
(1, 'FT accélérer'),
(2, 'FT annonce'),
(3, 'FT concrétisation'),
(4, 'FT contact'),
(5, 'FT identité'),
(6, 'FT paiement'),
(7, 'FT publicité'),
(8, 'FT search'),
(9, 'FT tools');

-- --------------------------------------------------------

--
-- Structure de la table `questions`
--

CREATE TABLE `questions` (
  `id_q` integer UNSIGNED NOT NULL,
  `chapitre_q` varchar(30) NOT NULL,
  `intitule_q` tinytext NOT NULL,
  `lien_q` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `questions`
--

INSERT INTO `questions` (`id_q`, `chapitre_q`, `intitule_q`, `lien_q`) VALUES
(1, 'Process_bases', 'L\'équipe s\'est-elle réunie au moins une fois les 2 derniers mois pour améliorer ses méthodes de travail ?', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=107804777'),
(2, 'Process_bases', 'Votre équipe a-t-elle une liste connue, priorisée et claire des tâches sur lesquelles elle doit travailler ?', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=107804784'),
(3, 'Process_bases', 'L\'équipe délivre-t-elle à ses demandeurs au moins un incrément de service ou produit par mois ?', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=107804785'),
(4, 'Process_maitriser', 'L\'équipe se rencontre-t-elle de façon régulière pour améliorer ses méthodes de travail et son efficacité ?\r\n', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=107804787'),
(5, 'Process_maitriser', 'Tient-on compte des flux de nos différents process de développement ?\r\n', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=107804788'),
(6, 'Process_maitriser', 'Le statut du sprint est-il connu de tous à tout moment ?\r\n', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=107804789'),
(7, 'Process_ameliorer', 'L\'équipe suit elle un process d\'amélioration continue pour améliorer sa maturité ?', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=107804792'),
(8, 'Process_ameliorer', 'Les objectifs fixés sont ils atteignables par l’équipe, ne voit elle pas trop grand ?\r\n', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=107804793'),
(9, 'Process_ameliorer', 'La livraison d\'incréments se fait-elle de façon continue ?\r\n', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=107804794'),
(10, 'Process_ameliorer', 'Le Bus-Factor de l\'équipe est-il supérieur à 1 ?', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=110592219'),
(11, 'Process_aider', 'L\'équipe prend-elle des actions pour aider les équipes partenaires à améliorer leur process ?', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=107804801'),
(12, 'Qualite', 'Le code a des tests unitaires (BE, FE, Mobile)', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=107804805'),
(13, 'Qualite', 'Syntaxe, Code-review +2 et outillage du code', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=107804806'),
(14, 'Qualite', 'L\'équipe est autonome pour déployer tous ses services', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=107804807'),
(15, 'Qualite', 'On peut installer et configurer les projets de l\'équipe uniquement grâce au README file', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=107804808'),
(16, 'Qualite', 'Petites PRs, pas de faux approval et disponibilité pour les reviews', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=107804809'),
(17, 'Qualite', 'Des tests automatiques sont inclus dans la CI avant déploiement (BE, FE, Mobile)\r\n', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=107804811'),
(18, 'Qualite', 'Notre code est clair et suffit à s\'expliquer lui-même', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=107804812'),
(19, 'Qualite', 'Pas de TODO ou FIXME dans le code sans un ticket associé.', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=107804813'),
(20, 'Qualite', 'L\'équipe écrit un rapport d\'incident après chaque incident en prod.', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=107804814'),
(21, 'Qualite', 'On review les PRs d\'autres équipes.', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=107804816'),
(22, 'Qualite', 'L\'équipe génère des changelog automatiquement', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=107804819'),
(23, 'Qualite', 'Un outil de documentation auto est utilisé sur le code', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=107804820'),
(24, 'Qualite', 'L\'équipe utilise un outil pour réduire la taille du code (Front End, Mobile)', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=107804821'),
(25, 'Qualite', 'L\'équipe tient les SDKs, librairies et les dépendances à jour', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=110599564'),
(26, 'Qualite', 'Les principales User Stories de l\'équipe ont des tests d\'acceptance', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=107804823'),
(27, 'Qualite', 'Boy Scout: on laisse un code encore plus propre après notre passage.\r\n', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=107804824'),
(28, 'Qualite', 'Les process critiques de l\'équipe sont documentés.', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=107804826'),
(29, 'Qualite', 'On utilise les \"feature flag\" pour activer les nouvelles features', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=107804827'),
(30, 'Qualite', 'Canary Releasing', 'https://confluence.schibsted.io/display/~julien.conan@scmfrance.fr/1.+Canary+Releasing'),
(31, 'Qualite', 'Team defined Service Level Objectives (SLO) in its services Team has metrics to check compliance with the defined SLOs for every deployed service Team has a dashboard with the services\' SLOs', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=107804830'),
(32, 'Qualite', 'New team members can Onboard only following team\'s documentation.', 'https://confluence.schibsted.io/display/~julien.conan@scmfrance.fr/3.+New+team+members+can+Onboard+only+following+team%27s+documentation'),
(33, 'Qualite', 'Team uses an automatic tool to reduce size of the deliverable (Front End, Mobile)\r\n', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=107804832'),
(34, 'Valeur_identifier', 'L\'équipe connaît-elle ses objectifs du trimestre ?', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=107804835'),
(35, 'Valeur_identifier', 'L\'équipe sait-elle qui sont ses clients et quels sont leurs besoins ?', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=107804836'),
(36, 'Valeur_identifier', 'L\'équipe suit-elle ses KPIs et propose-t-elle des actions pour les améliorer ?', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=107804837'),
(37, 'Valeur_concentrer', 'Notre roadmap est-elle alignée avec les objectifs d\'entreprise et priorisée selon les besoins de nos clients ?', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=107804839'),
(38, 'Valeur_concentrer', 'Transformez-vous le feedback des clients régulièrement et de façon structurée ?\r\n', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=107804840'),
(39, 'Valeur_concentrer', 'L\'équipe mesure-t-elle l\'effet de ses actions ?', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=107804841'),
(40, 'Valeur_concentrer', 'L\'équipe a-t-elle un plan à moyen terme sur la valeur qu\'elle délivre à ses clients ?\r\n', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=107804842'),
(41, 'Valeur_livrer', 'Vérifie-t-on que nos hypothèses délivrent de la valeur à nos clients ?', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=107804844'),
(42, 'Valeur_livrer', 'La plupart des livraisons de l\'équipe ont un impact positif sur le business', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=107804845'),
(43, 'Valeur_livrer', 'Nous réalisons au moins 70% de ce que nous avions prévu sur la roadmap du trimestre\r\n', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=107804846'),
(44, 'Valeur_optimiser', 'Est-ce que l\'équipe partage avec les parties prenantes quand il s\'agit de trouver un plan B ?\r\n', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=107804848'),
(45, 'Valeur_optimiser', 'Est-ce que les plans B améliorent la valeur livrée ?', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=107804849'),
(46, 'Valeur_optimiser', 'L\'équipe sait-elle comment ses actions impactent les domaines d\'activité ?', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=107804850'),
(47, 'Valeur_innovante', 'L\'équipe découvre-t-elle de la valeur qu\'elle ne connaissait pas il y a 6 mois ?\r\n', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=107804852'),
(48, 'Valeur_innovante', 'L\'équipe a-t-elle les outils et les compétences pour arrêter d\'itérer quand la solution convient ?\r\n', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=107804853'),
(49, 'Valeur_innovante', 'L\'équipe a-t-elle pris une action pour améliorer l\'orientation valeur d\'une autre équipe pour améliorer le business de la société ?', 'https://confluence.schibsted.io/pages/viewpage.action?pageId=107804854');

-- --------------------------------------------------------

--
-- Structure de la table `resultats`
--

CREATE TABLE `resultats` (
  `id_r` integer UNSIGNED NOT NULL,
  `id_camp_r` integer UNSIGNED DEFAULT NULL,
  `id_q_r` integer UNSIGNED DEFAULT NULL,
  `reponse_r` integer NOT NULL,
  `commentaire_r` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `campagnes`
--
ALTER TABLE `campagnes`
  ADD PRIMARY KEY (`id_camp`),
  ADD KEY `FK_id_team` (`id_ft_camp`);

--
-- Index pour la table `feature_team`
--
ALTER TABLE `feature_team`
  ADD PRIMARY KEY (`id_ft`);

--
-- Index pour la table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id_q`);

--
-- Index pour la table `resultats`
--
ALTER TABLE `resultats`
  ADD PRIMARY KEY (`id_r`),
  ADD KEY `FK_id_camp` (`id_camp_r`),
  ADD KEY `FK_id_question` (`id_q_r`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `campagnes`
--
ALTER TABLE `campagnes`
  MODIFY `id_camp` integer UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT pour la table `feature_team`
--
ALTER TABLE `feature_team`
  MODIFY `id_ft` integer UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `questions`
--
ALTER TABLE `questions`
  MODIFY `id_q` integer UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT pour la table `resultats`
--
ALTER TABLE `resultats`
  MODIFY `id_r` integer UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `campagnes`
--
ALTER TABLE `campagnes`
  ADD CONSTRAINT `FK_id_team` FOREIGN KEY (`id_ft_camp`) REFERENCES `feature_team` (`id_ft`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `resultats`
--
ALTER TABLE `resultats`
  ADD CONSTRAINT `FK_id_camp` FOREIGN KEY (`id_camp_r`) REFERENCES `campagnes` (`id_camp`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_id_question` FOREIGN KEY (`id_q_r`) REFERENCES `questions` (`id_q`) ON DELETE SET NULL ON UPDATE CASCADE;
