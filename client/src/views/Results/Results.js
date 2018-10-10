import React, { Fragment } from "react";
import Moment from "moment";

import Header from "../../components/Header/Header";

import IconCross from "./icons/Cross2.png";
import IconCheck from "./icons/check2.png";

import "./Results.css";

class Results extends React.Component {
  state = {
    allCamp: [],
    nCamp: [],
    transformNCamp: {},
    n1Camp: [],
    transformN1Camp: {},
    n2Camp: [],
    transformN2Camp: {},
    id_ft: this.props.match.params.id,
    currentCampaignId: this.props.match.params.id_camp
  };

  componentDidMount() {
    //récupère la campagne n et éventuellement les campagnes n-1 et n-2
    this.callApi(
      `/api/get3campaigns/${this.state.id_ft}/${this.state.currentCampaignId}`
    )
      //on stocke la réponse dans "allCamp" ET on vérifie s'il existe 1, 2 ou 3 campagnes
      .then(response => {
        this.setState({ allCamp: response }, () =>
          console.log("liste des campagnes à comparer :", this.state.allCamp)
        );
        //si 3 campagnes à comparer on requête sur les 3
        if (this.state.allCamp.length === 3) {
          console.log("vous avez 3 campagnes à comparer");

          const campaignId0 = this.state.allCamp[0].id_camp;
          const campaignId1 = this.state.allCamp[1].id_camp;
          const campaignId2 = this.state.allCamp[2].id_camp;
          Promise.all([
            this.callApi(`/api/results_n/process/${campaignId0}`),
            this.callApi(`/api/results_n/process/${campaignId1}`),
            this.callApi(`/api/results_n/process/${campaignId2}`)
          ])
            .then(reponses => {
              this.setState({ nCamp: reponses[0] });
              this.setState({ n1Camp: reponses[1] });
              this.setState({ n2Camp: reponses[2] });
              console.log(this.state.n2Camp);
            })
            .then(() => {
              this.setState({
                transformNCamp: this.transformResults(this.state.nCamp),
                transformN1Camp: this.transformResults(this.state.n1Camp),
                transformN2Camp: this.transformResults(this.state.n2Camp)
              });
              console.log(this.state.transformN2Camp);
            });

          //si 2 campagnes à comparer on requête sur les 2
        } else if (this.state.allCamp.length === 2) {
          console.log("vous avez 2 campagnes à comparer");

          //si 1 seule campagne on requête seulement cette campagne et on ne compare rien
        } else {
          console.log("vous avez une campagne à comparer");
          this.callApi(`/api/results_n/process/${this.state.currentCampaignId}`)
            .then(response => {
              console.log(response);
              this.setState({ nCamp: response });
            })
            //on transforme la réponse et on la stocke dans le state
            .then(() => {
              this.setState({
                transformNCamp: this.transformResults(this.state.nCamp)
              });

              console.log(this.state.transformNCamp);
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  }

  callApi = async url => {
    // C'est beau
    const response = await fetch(url);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  //permet de transformer les résultats obtenus de la DB pour les trier par sous-chapitres
  transformResults = campagnes => {
    if (!campagnes || campagnes.length === 0) return null;
    const chapterWithQuestions = {};
    campagnes.forEach(function(e) {
      if (!chapterWithQuestions[e.chapitre_q]) {
        chapterWithQuestions[e.chapitre_q] = [e];
      } else {
        chapterWithQuestions[e.chapitre_q].push(e);
      }
    });
    return chapterWithQuestions;
  };

  render() {
    if (
      !this.state.transformNCamp.Process_bases ||
      this.state.transformNCamp.Process_bases.length === 0 ||
      !this.state.allCamp
    ) {
      console.log(this.state.transformNCamp);
      return null;
    } else if (this.state.allCamp.length === 1) {
      return (
        <Fragment>
          <Header className="buttonreturn" />

          <h1 className="h1_campaign_name">
            Résultats de la campagne {this.state.allCamp[0].nom_camp}
          </h1>
          <h2 className="h2_date">
            <span>du </span>
            {Moment(this.state.allCamp[0].date_camp).format("DD/MM/YYYY")}
          </h2>
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
              <tr>
                <td colSpan="4" className="tdChapitre">
                  PROCESS
                </td>
              </tr>
              <tr>
                <td colSpan="4" className="tdSousChapitre">
                  Les bases
                </td>
              </tr>
              {this.state.transformNCamp.Process_bases.map(e => (
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
              <tr>
                <td colSpan="4" className="tdSousChapitre">
                  Maîtriser vos livraisons
                </td>
              </tr>
              {this.state.transformNCamp.Process_maitriser.map(e => (
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

              <tr>
                <td colSpan="4" className="tdSousChapitre">
                  Améliorer vos livraisons
                </td>
              </tr>
              {this.state.transformNCamp.Process_ameliorer.map(e => (
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

              <tr>
                <td colSpan="4" className="tdSousChapitre">
                  Aider les équipes partenaires à améliorer leurs process
                </td>
              </tr>
              {this.state.transformNCamp.Process_aider.map(e => (
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
    } else if (this.state.allCamp.length === 2) {
      return <p>J'ai deux results</p>;
    } else if (this.state.allCamp.length === 3) {
      return (
        <Fragment>
          <Header className="buttonreturn" />

          <h1 className="h1_campaign_name">
            Résultats de la campagne {this.state.allCamp[0].nom_camp}
          </h1>
          <h2 className="h2_date">
            <span>du </span>
            {Moment(this.state.allCamp[0].date_camp).format("DD/MM/YYYY")}
          </h2>
          <table>
            <thead>
              <tr>
                <th />
                <th>campagne {this.state.allCamp[2].nom_camp}</th>
                <th>campagne {this.state.allCamp[1].nom_camp}</th>
                <th>campagne {this.state.allCamp[0].nom_camp}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="4" className="tdChapitre">
                  PROCESS
                </td>
              </tr>
              <tr>
                <td colSpan="4" className="tdSousChapitre">
                  Les bases
                </td>
              </tr>
              {this.state.transformNCamp.Process_bases.map(e => (
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
              <tr>
                <td colSpan="4" className="tdSousChapitre">
                  Maîtriser vos livraisons
                </td>
              </tr>
              {this.state.transformNCamp.Process_maitriser.map(e => (
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

              <tr>
                <td colSpan="4" className="tdSousChapitre">
                  Améliorer vos livraisons
                </td>
              </tr>
              {this.state.transformNCamp.Process_ameliorer.map(e => (
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

              <tr>
                <td colSpan="4" className="tdSousChapitre">
                  Aider les équipes partenaires à améliorer leurs process
                </td>
              </tr>
              {this.state.transformNCamp.Process_aider.map(e => (
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
    } else {
      console.log(this.state.allCamp.length);
      return "oups";
    }
  }
}

export default Results;
