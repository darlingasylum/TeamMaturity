import React, { Fragment } from "react";
import Header from "../../components/Header/Header";
import Question from "../../components/Question/Question";
import Icon from "./Icons/noun_right.svg";
import IconLeft from "./Icons/noun_left.svg";

class NextPage extends React.Component {
  render() {
    return (
      <Fragment>
        <Header />
        <h3>JE SUIS SUR LA PAGE 2</h3>
        <Question textQuestion="L'équipe s'est elle réunie au moins une fois les 2 derniers mois pour améliorer ses méthodes de travail ?" />
        <Question textQuestion="Votre équipe a t elle une liste connue, priorisée et claire des tâches sur lesquelles elle doit travailler ?" />
        <Question textQuestion="L'équipe délivre t elle à ses demandeurs au moins un incrément de service ou produit par mois ?" />
        <h3>PROCESS: MAITRISER VOS LIVRAISONS</h3>
        <Question textQuestion="L'équipe se rencontre t elle de façon régulière pour améliorer ses méthodes de travail et son efficacité ?" />
        <Question textQuestion="Tient on compte des flux de nos différents process de développement ?" />
        <Question textQuestion="Le status du sprint est il connu de tous à tout moment ?" />
        <h3>PROCESS: AMELIORER VOS LIVRAISONS</h3>
        <Question textQuestion="L'équipe suit elle un process d'amélioration continue pour améliorer sa maturité ?" />
        <Question textQuestion="Les objectifs fixés sont ils atteignables par l’équipe, ne voit elle pas trop grand ?" />
        <Question textQuestion="La livraison d'incréments se fait elle de façon continue ?" />
        <Question textQuestion="Le Bus-Factor de l'équipe est il supérieur à 1 ?" />
        <h3>
          PROCESS: AIDER LES EQUIPES PARTENAIRES A AMELIORER LEURS PROCESS
        </h3>
        <Question textQuestion="L'équipe prend elle des actions pour aider les équipes partenaires à améliorer leur process ?" />
        <img className="leftArrow" src={IconLeft} />
        <img className="rightArrow" src={Icon} />
      </Fragment>
    );
  }
}

export default NextPage;
