import React, { Fragment } from "react";

import Header from "../../components/Header/Header";

import IconCross from "./icons/Cross2.png";
import IconCheck from "./icons/check2.png";

import "./Results.css";

class Results extends React.Component {
  state = {
    nCamp: [],
    allCamp: [],
    n1Camp: [],
    n2Camp: [],
    id_ft: this.props.match.params.id,
    currentCampaignId: this.props.match.params.id_camp
  };

  componentDidMount() {
    //récupère les 3 campagnes n, n-1 et n-2
    this.callApi(
      `/api/get3campaigns/${this.state.id_ft}/${this.state.currentCampaignId}`
    )
      //sur la réponse on vérifie s'il existe 1, 2 ou 3 campagnes et on adapte le code
      .then(response => {
        this.setState({ allCamp: response }, () =>
          console.log(this.state.allCamp)
        );
        //si 3 campagnes à comparer on requête sur les 3
        if (this.state.allCamp.length === 3) {
          console.log("3");

          //si 2 campagnes à comparer on requête sur les 2
        } else if (this.state.allCamp.length === 2) {
          console.log("2");

          //si 1 seule campagne on requête seulement cette campagne et on ne compare rien
        } else {
          console.log("one");
          this.callApi(`/api/results_n/process/${this.state.currentCampaignId}`)
            .then(response => {
              // console.log(response);
              this.setState({ nCamp: response }, () => console.log(this.state));
            })
            //on transforme la réponse en triant les résultats par sous-chapitre
            .then(response => {})
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  }

  callApi = async url => {
    const response = await fetch(url);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  // transformResults = () => {
  //   if (!this.state.nCamp || this.state.nCamp.length == []) return null;
  //   const chapterWithQuestions = {};
  //   this.state.nCamp.forEach(function(e) {
  //     if (!chapterWithQuestions[e.chapitre_q]) {
  //       chapterWithQuestions[e.chapitre_q] = [e];
  //     } else {
  //       chapterWithQuestions[e.chapitre_q].push(e);
  //     }
  //   });
  //   console.log(chapterWithQuestions);
  // };

  render() {
    if (!this.state.nCamp || this.state.nCamp.length == []) return null;
    const chapterWithQuestions = {};
    this.state.nCamp.forEach(function(e) {
      if (!chapterWithQuestions[e.chapitre_q]) {
        chapterWithQuestions[e.chapitre_q] = [e];
      } else {
        chapterWithQuestions[e.chapitre_q].push(e);
      }
    });
    console.log(chapterWithQuestions);
    return (
      <Fragment>
        <Header className="buttonreturn" />
        <table>
          <thead>
            <tr>
              <th />
              <th>campagne n-2</th>
              <th>campagne n-1</th>
              <th>campagne n</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr>
              <td>The table body</td>
              <td>with two columns</td>
            </tr> */}
            {chapterWithQuestions.Process_bases.map(e => (
              <tr>
                <td>
                  {e.id_q} - {e.intitule_q}
                </td>
                <td />
                <td />

                {e.reponse_r === 0 ? (
                  <td>
                    <img src={IconCross} />
                  </td>
                ) : e.reponse_r === 1 ? (
                  <td>
                    <img src={IconCheck} />
                  </td>
                ) : (
                  <p>pas de rep</p>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

export default Results;
