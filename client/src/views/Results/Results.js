import React, { Fragment } from "react";
import Moment from "moment";

import Header from "../../components/Header/Header";

import IconCross from "./icons/Cross2.png";
import IconCheck from "./icons/check2.png";

import "./Results.css";

class Results extends React.Component {
  state = {
    allCamp: [],
    transformNCamp: {},
    transformN1Camp: {},
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
            this.callApi(`/api/results_n/${campaignId0}`),
            this.callApi(`/api/results_n/${campaignId1}`),
            this.callApi(`/api/results_n/${campaignId2}`)
          ]).then(reponses => {
            this.setState({
              transformNCamp: this.transformResults(reponses[0]),
              transformN1Camp: this.transformResults(reponses[1]),
              transformN2Camp: this.transformResults(reponses[2])
            });
            console.log(this.state.n2Camp);
          });

          //si 2 campagnes à comparer on requête sur les 2
        } else if (this.state.allCamp.length === 2) {
          console.log("vous avez 2 campagnes à comparer");
          const campaignId0 = this.state.allCamp[0].id_camp;
          const campaignId1 = this.state.allCamp[1].id_camp;
          Promise.all([
            this.callApi(`/api/results_n/${campaignId0}`),
            this.callApi(`/api/results_n/${campaignId1}`)
          ]).then(reponses => {
            this.setState({
              transformNCamp: this.transformResults(reponses[0]),
              transformN1Camp: this.transformResults(reponses[1])
            });
            console.log(this.state.n2Camp);
          });

          //si 1 seule campagne on requête seulement cette campagne et on ne compare rien
        } else {
          console.log("vous avez une campagne à comparer");
          this.callApi(`/api/results_n/${this.state.currentCampaignId}`)
            .then(response => {
              console.log(response);
              this.setState(
                {
                  transformNCamp: this.transformResults(response)
                },
                () => console.log(this.state.transformNCamp)
              );
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
      console.log("ne passe pas la première condition du render");
      return null;

      //S'IL N'EXISTE QU'UNE CAMPAGNE N
    } else if (this.state.allCamp.length === 1) {
      return (
        <Fragment>
          <Header
            header="header"
            className="buttonreturn"
            teamName={sessionStorage.getItem("currentFTName")}
            teamNameClass="header_team"
          />

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
                <th>campagne {this.state.allCamp[0].nom_camp}</th>
              </tr>
            </thead>
            <tbody>
              {/* PROCESS BASES - MAP SUR TRANSFORMNCAMP POUR AFFICHER LES QUESTIONS ET LES REPONSES DE LA CAMPAGNE N */}
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
                  <td className="TDResult">
                    {e.reponse_r === 0 ? (
                      <img
                        src={IconCross}
                        alt="negativeIcon"
                        className="icon"
                      />
                    ) : e.reponse_r === 1 ? (
                      <img
                        src={IconCheck}
                        alt="positiveIcon"
                        className="icon"
                      />
                    ) : (
                      <p>pas de rep</p>
                    )}
                  </td>
                </tr>
              ))}

              {/* PROCESS MAITRISER - MAP SUR TRANSFORMNCAMP POUR AFFICHER LES QUESTIONS ET LES REPONSES DE LA CAMPAGNE N */}
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

                  <td className="TDResult">
                    {e.reponse_r === 0 ? (
                      <img
                        src={IconCross}
                        alt="negativeIcon"
                        className="icon"
                      />
                    ) : e.reponse_r === 1 ? (
                      <img
                        src={IconCheck}
                        alt="positiveIcon"
                        className="icon"
                      />
                    ) : (
                      <p>pas de rep</p>
                    )}
                  </td>
                </tr>
              ))}
              {/* PROCESS AMELIORER - MAP SUR TRANSFORMNCAMP POUR AFFICHER LES QUESTIONS ET LES REPONSES DE LA CAMPAGNE N */}
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

                  <td className="TDResult">
                    {e.reponse_r === 0 ? (
                      <img
                        src={IconCross}
                        alt="negativeIcon"
                        className="icon"
                      />
                    ) : e.reponse_r === 1 ? (
                      <img
                        src={IconCheck}
                        alt="positiveIcon"
                        className="icon"
                      />
                    ) : (
                      <p>pas de rep</p>
                    )}
                  </td>
                </tr>
              ))}
              {/* PROCESS AIDER - MAP SUR TRANSFORMNCAMP POUR AFFICHER LES QUESTIONS ET LES REPONSES DE LA CAMPAGNE N */}
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

                  <td className="TDResult">
                    {e.reponse_r === 0 ? (
                      <img
                        src={IconCross}
                        alt="negativeIcon"
                        className="icon"
                      />
                    ) : e.reponse_r === 1 ? (
                      <img
                        src={IconCheck}
                        alt="positiveIcon"
                        className="icon"
                      />
                    ) : (
                      <p>pas de rep</p>
                    )}
                  </td>
                </tr>
              ))}

              {/* QUALITE - MAP SUR TRANSFORMNCAMP POUR AFFICHER LES QUESTIONS ET LES REPONSES DE LA CAMPAGNE N */}
              <tr>
                <td colSpan="4" className="tdChapitre">
                  QUALITE
                </td>
              </tr>

              {this.state.transformNCamp.Qualite.map(e => (
                <tr>
                  <td>
                    {e.id_q} - {e.intitule_q}
                  </td>
                  <td className="TDResult">
                    {e.reponse_r === 0 ? (
                      <img
                        src={IconCross}
                        alt="negativeIcon"
                        className="icon"
                      />
                    ) : e.reponse_r === 1 ? (
                      <img
                        src={IconCheck}
                        alt="positiveIcon"
                        className="icon"
                      />
                    ) : (
                      <p>pas de rep</p>
                    )}
                  </td>
                </tr>
              ))}

              {/* VALEUR IDENTIFIER - MAP SUR TRANSFORMNCAMP POUR AFFICHER LES QUESTIONS ET LES REPONSES DE LA CAMPAGNE N */}
              <tr>
                <td colSpan="4" className="tdChapitre">
                  VALEUR
                </td>
              </tr>
              <tr>
                <td colSpan="4" className="tdSousChapitre">
                  Identifier la valeur
                </td>
              </tr>
              {this.state.transformNCamp.Valeur_identifier.map(e => (
                <tr>
                  <td>
                    {e.id_q} - {e.intitule_q}
                  </td>
                  <td className="TDResult">
                    {e.reponse_r === 0 ? (
                      <img
                        src={IconCross}
                        alt="negativeIcon"
                        className="icon"
                      />
                    ) : e.reponse_r === 1 ? (
                      <img
                        src={IconCheck}
                        alt="positiveIcon"
                        className="icon"
                      />
                    ) : (
                      <p>pas de rep</p>
                    )}
                  </td>
                </tr>
              ))}

              {/* VALEUR CONCENTRER - MAP SUR TRANSFORMNCAMP POUR AFFICHER LES QUESTIONS ET LES REPONSES DE LA CAMPAGNE N */}
              <tr>
                <td colSpan="4" className="tdSousChapitre">
                  Se concentrer sur la valeur
                </td>
              </tr>
              {this.state.transformNCamp.Valeur_concentrer.map(e => (
                <tr>
                  <td>
                    {e.id_q} - {e.intitule_q}
                  </td>

                  <td className="TDResult">
                    {e.reponse_r === 0 ? (
                      <img
                        src={IconCross}
                        alt="negativeIcon"
                        className="icon"
                      />
                    ) : e.reponse_r === 1 ? (
                      <img
                        src={IconCheck}
                        alt="positiveIcon"
                        className="icon"
                      />
                    ) : (
                      <p>pas de rep</p>
                    )}
                  </td>
                </tr>
              ))}
              {/* VALEUR LIVRER - MAP SUR TRANSFORMNCAMP POUR AFFICHER LES QUESTIONS ET LES REPONSES DE LA CAMPAGNE N */}
              <tr>
                <td colSpan="4" className="tdSousChapitre">
                  Livrer de la valeur
                </td>
              </tr>
              {this.state.transformNCamp.Valeur_livrer.map(e => (
                <tr>
                  <td>
                    {e.id_q} - {e.intitule_q}
                  </td>

                  <td className="TDResult">
                    {e.reponse_r === 0 ? (
                      <img
                        src={IconCross}
                        alt="negativeIcon"
                        className="icon"
                      />
                    ) : e.reponse_r === 1 ? (
                      <img
                        src={IconCheck}
                        alt="positiveIcon"
                        className="icon"
                      />
                    ) : (
                      <p>pas de rep</p>
                    )}
                  </td>
                </tr>
              ))}
              {/* VALEUR OPTIMISER - MAP SUR TRANSFORMNCAMP POUR AFFICHER LES QUESTIONS ET LES REPONSES DE LA CAMPAGNE N */}
              <tr>
                <td colSpan="4" className="tdSousChapitre">
                  Aider les équipes partenaires à améliorer leurs process
                </td>
              </tr>
              {this.state.transformNCamp.Valeur_optimiser.map(e => (
                <tr>
                  <td>
                    {e.id_q} - {e.intitule_q}
                  </td>

                  <td className="TDResult">
                    {e.reponse_r === 0 ? (
                      <img
                        src={IconCross}
                        alt="negativeIcon"
                        className="icon"
                      />
                    ) : e.reponse_r === 1 ? (
                      <img
                        src={IconCheck}
                        alt="positiveIcon"
                        className="icon"
                      />
                    ) : (
                      <p>pas de rep</p>
                    )}
                  </td>
                </tr>
              ))}

              {/* VALEUR INNOVANTE - MAP SUR TRANSFORMNCAMP POUR AFFICHER LES QUESTIONS ET LES REPONSES DE LA CAMPAGNE N */}
              <tr>
                <td colSpan="4" className="tdSousChapitre">
                  De la valeur innovante
                </td>
              </tr>
              {this.state.transformNCamp.Valeur_innovante.map(e => (
                <tr>
                  <td>
                    {e.id_q} - {e.intitule_q}
                  </td>

                  <td className="TDResult">
                    {e.reponse_r === 0 ? (
                      <img
                        src={IconCross}
                        alt="negativeIcon"
                        className="icon"
                      />
                    ) : e.reponse_r === 1 ? (
                      <img
                        src={IconCheck}
                        alt="positiveIcon"
                        className="icon"
                      />
                    ) : (
                      <p>pas de rep</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Fragment>
      );

      //S'IL EXISTE UNE CAMPAGNE N ET UNE CAMPAGNE N-1
    } else if (this.state.allCamp.length === 2) {
      return (
        <Fragment>
          <Header
            header="header"
            className="buttonreturn"
            teamName={sessionStorage.getItem("currentFTName")}
            teamNameClass="header_team"
          />
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
              {/* PROCESS BASES - MAP SUR TRANSFORMNCAMP POUR AFFICHER LES QUESTIONS ET LES REPONSES DE LA CAMPAGNE N */}
              {this.state.transformNCamp.Process_bases.map(e => (
                <tr>
                  <td>
                    {e.id_q} - {e.intitule_q}
                  </td>

                  {/* PROCESS BASES - MAP SUR TRANSFORMN1CAMP POUR AFFICHER LES RESULTATS N-1 */}
                  {this.state.transformN1Camp.Process_bases.map(
                    e1 =>
                      e1.id_q === e.id_q ? (
                        <td className="TDResult">
                          {e1.reponse_r === 0 ? (
                            <img
                              src={IconCross}
                              alt="negativeIcon"
                              className="icon"
                            />
                          ) : e1.reponse_r === 1 ? (
                            <img
                              src={IconCheck}
                              alt="positiveIcon"
                              className="icon"
                            />
                          ) : (
                            <p>pas de rep</p>
                          )}
                        </td>
                      ) : null
                  )}
                  {/* PROCESS BASES - MAP SUR TRANSFORMNCAMP POUR AFFICHER LES RESULTATS N */}
                  <td className="TDResult">
                    {e.reponse_r === 0 ? (
                      <img
                        src={IconCross}
                        alt="negativeIcon"
                        className="icon"
                      />
                    ) : e.reponse_r === 1 ? (
                      <img
                        src={IconCheck}
                        alt="positiveIcon"
                        className="icon"
                      />
                    ) : (
                      <p>pas de rep</p>
                    )}
                  </td>
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

                  {/* PROCESS MAITRISER - MAP SUR TRANSFORMN1CAMP POUR AFFICHER LES RESULTATS N-1 */}
                  {this.state.transformN1Camp.Process_maitriser.map(
                    e1 =>
                      e1.id_q === e.id_q ? (
                        <td className="TDResult">
                          {e1.reponse_r === 0 ? (
                            <img
                              src={IconCross}
                              alt="negativeIcon"
                              className="icon"
                            />
                          ) : e1.reponse_r === 1 ? (
                            <img
                              src={IconCheck}
                              alt="positiveIcon"
                              className="icon"
                            />
                          ) : (
                            <p>pas de rep</p>
                          )}
                        </td>
                      ) : null
                  )}
                  {/* PROCESS MAITRISER - MAP SUR TRANSFORMNCAMP POUR AFFICHER LES RESULTATS N */}
                  <td className="TDResult">
                    {e.reponse_r === 0 ? (
                      <img
                        src={IconCross}
                        alt="negativeIcon"
                        className="icon"
                      />
                    ) : e.reponse_r === 1 ? (
                      <img
                        src={IconCheck}
                        alt="positiveIcon"
                        className="icon"
                      />
                    ) : (
                      <p>pas de rep</p>
                    )}{" "}
                  </td>
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

                  {/*PROCESS AMELIORER -  MAP SUR TRANSFORMN1CAMP POUR AFFICHER LES RESULTATS N-1 */}
                  {this.state.transformN1Camp.Process_ameliorer.map(
                    e1 =>
                      e1.id_q === e.id_q ? (
                        <td className="TDResult">
                          {e1.reponse_r === 0 ? (
                            <img
                              src={IconCross}
                              alt="negativeIcon"
                              className="icon"
                            />
                          ) : e1.reponse_r === 1 ? (
                            <img
                              src={IconCheck}
                              alt="positiveIcon"
                              className="icon"
                            />
                          ) : (
                            <p>pas de rep</p>
                          )}
                        </td>
                      ) : null
                  )}
                  {/* PROCESS AMELIORER - MAP SUR TRANSFORMNCAMP POUR AFFICHER LES RESULTATS N */}
                  <td className="TDResult">
                    {e.reponse_r === 0 ? (
                      <img
                        src={IconCross}
                        alt="negativeIcon"
                        className="icon"
                      />
                    ) : e.reponse_r === 1 ? (
                      <img
                        src={IconCheck}
                        alt="positiveIcon"
                        className="icon"
                      />
                    ) : (
                      <p>pas de rep</p>
                    )}{" "}
                  </td>
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

                  {/* PROCESS AIDER - MAP SUR TRANSFORMN1CAMP POUR AFFICHER LES RESULTATS N-1 */}
                  {this.state.transformN1Camp.Process_aider.map(
                    e1 =>
                      e1.id_q === e.id_q ? (
                        <td className="TDResult">
                          {e1.reponse_r === 0 ? (
                            <img
                              src={IconCross}
                              alt="negativeIcon"
                              className="icon"
                            />
                          ) : e1.reponse_r === 1 ? (
                            <img
                              src={IconCheck}
                              alt="positiveIcon"
                              className="icon"
                            />
                          ) : (
                            <p>pas de rep</p>
                          )}
                        </td>
                      ) : null
                  )}
                  {/* PROCESS AIDER - MAP SUR TRANSFORMNCAMP POUR AFFICHER LES RESULTATS N */}
                  <td className="TDResult">
                    {e.reponse_r === 0 ? (
                      <img
                        src={IconCross}
                        alt="negativeIcon"
                        className="icon"
                      />
                    ) : e.reponse_r === 1 ? (
                      <img
                        src={IconCheck}
                        alt="positiveIcon"
                        className="icon"
                      />
                    ) : (
                      <p>pas de rep</p>
                    )}{" "}
                  </td>
                </tr>
              ))}

              <tr>
                <td colSpan="4" className="tdChapitre">
                  QUALITE
                </td>
              </tr>

              {this.state.transformNCamp.Qualite.map(e => (
                <tr>
                  <td>
                    {e.id_q} - {e.intitule_q}
                  </td>

                  {/* QUALITE - MAP SUR TRANSFORMN1CAMP POUR AFFICHER LES RESULTATS N-1 */}
                  {this.state.transformN1Camp.Qualite.map(
                    e1 =>
                      e1.id_q === e.id_q ? (
                        <td className="TDResult">
                          {e1.reponse_r === 0 ? (
                            <img
                              src={IconCross}
                              alt="negativeIcon"
                              className="icon"
                            />
                          ) : e1.reponse_r === 1 ? (
                            <img
                              src={IconCheck}
                              alt="positiveIcon"
                              className="icon"
                            />
                          ) : (
                            <p>pas de rep</p>
                          )}
                        </td>
                      ) : null
                  )}
                  {/* QUALITE - MAP SUR TRANSFORMNCAMP POUR AFFICHER LES RESULTATS N */}
                  <td className="TDResult">
                    {e.reponse_r === 0 ? (
                      <img
                        src={IconCross}
                        alt="negativeIcon"
                        className="icon"
                      />
                    ) : e.reponse_r === 1 ? (
                      <img
                        src={IconCheck}
                        alt="positiveIcon"
                        className="icon"
                      />
                    ) : (
                      <p>pas de rep</p>
                    )}{" "}
                  </td>
                </tr>
              ))}

              <tr>
                <td colSpan="4" className="tdChapitre">
                  VALEUR
                </td>
              </tr>

              <tr>
                <td colSpan="4" className="tdSousChapitre">
                  Identifier la valeur
                </td>
              </tr>
              {this.state.transformNCamp.Valeur_identifier.map(e => (
                <tr>
                  <td>
                    {e.id_q} - {e.intitule_q}
                  </td>

                  {/* VALEUR IDENTIFIER - MAP SUR TRANSFORMN1CAMP POUR AFFICHER LES RESULTATS N-1 */}
                  {this.state.transformN1Camp.Valeur_identifier.map(
                    e1 =>
                      e1.id_q === e.id_q ? (
                        <td className="TDResult">
                          {e1.reponse_r === 0 ? (
                            <img
                              src={IconCross}
                              alt="negativeIcon"
                              className="icon"
                            />
                          ) : e1.reponse_r === 1 ? (
                            <img
                              src={IconCheck}
                              alt="positiveIcon"
                              className="icon"
                            />
                          ) : (
                            <p>pas de rep</p>
                          )}
                        </td>
                      ) : null
                  )}
                  {/* VALEUR IDENTIFIER - MAP SUR TRANSFORMNCAMP POUR AFFICHER LES RESULTATS N */}
                  <td className="TDResult">
                    {e.reponse_r === 0 ? (
                      <img
                        src={IconCross}
                        alt="negativeIcon"
                        className="icon"
                      />
                    ) : e.reponse_r === 1 ? (
                      <img
                        src={IconCheck}
                        alt="positiveIcon"
                        className="icon"
                      />
                    ) : (
                      <p>pas de rep</p>
                    )}{" "}
                  </td>
                </tr>
              ))}

              <tr>
                <td colSpan="4" className="tdSousChapitre">
                  Se concentrer sur la valeur
                </td>
              </tr>
              {this.state.transformNCamp.Valeur_concentrer.map(e => (
                <tr>
                  <td>
                    {e.id_q} - {e.intitule_q}
                  </td>

                  {/* VALEUR CONCENTRER - MAP SUR TRANSFORMN1CAMP POUR AFFICHER LES RESULTATS N-1 */}
                  {this.state.transformN1Camp.Valeur_concentrer.map(
                    e1 =>
                      e1.id_q === e.id_q ? (
                        <td className="TDResult">
                          {e1.reponse_r === 0 ? (
                            <img
                              src={IconCross}
                              alt="negativeIcon"
                              className="icon"
                            />
                          ) : e1.reponse_r === 1 ? (
                            <img
                              src={IconCheck}
                              alt="positiveIcon"
                              className="icon"
                            />
                          ) : (
                            <p>pas de rep</p>
                          )}
                        </td>
                      ) : null
                  )}
                  {/* VALEUR CONCENTRER - MAP SUR TRANSFORMNCAMP POUR AFFICHER LES RESULTATS N */}
                  <td className="TDResult">
                    {e.reponse_r === 0 ? (
                      <img
                        src={IconCross}
                        alt="negativeIcon"
                        className="icon"
                      />
                    ) : e.reponse_r === 1 ? (
                      <img
                        src={IconCheck}
                        alt="positiveIcon"
                        className="icon"
                      />
                    ) : (
                      <p>pas de rep</p>
                    )}{" "}
                  </td>
                </tr>
              ))}

              <tr>
                <td colSpan="4" className="tdSousChapitre">
                  Livrer de la valeur
                </td>
              </tr>
              {this.state.transformNCamp.Valeur_livrer.map(e => (
                <tr>
                  <td>
                    {e.id_q} - {e.intitule_q}
                  </td>

                  {/* VALEUR LIVRER - MAP SUR TRANSFORMN1CAMP POUR AFFICHER LES RESULTATS N-1 */}
                  {this.state.transformN1Camp.Valeur_livrer.map(
                    e1 =>
                      e1.id_q === e.id_q ? (
                        <td className="TDResult">
                          {e1.reponse_r === 0 ? (
                            <img
                              src={IconCross}
                              alt="negativeIcon"
                              className="icon"
                            />
                          ) : e1.reponse_r === 1 ? (
                            <img
                              src={IconCheck}
                              alt="positiveIcon"
                              className="icon"
                            />
                          ) : (
                            <p>pas de rep</p>
                          )}
                        </td>
                      ) : null
                  )}
                  {/* VALEUR LIVRER - MAP SUR TRANSFORMNCAMP POUR AFFICHER LES RESULTATS N */}
                  <td className="TDResult">
                    {e.reponse_r === 0 ? (
                      <img
                        src={IconCross}
                        alt="negativeIcon"
                        className="icon"
                      />
                    ) : e.reponse_r === 1 ? (
                      <img
                        src={IconCheck}
                        alt="positiveIcon"
                        className="icon"
                      />
                    ) : (
                      <p>pas de rep</p>
                    )}{" "}
                  </td>
                </tr>
              ))}

              <tr>
                <td colSpan="4" className="tdSousChapitre">
                  Optimiser la valeur
                </td>
              </tr>
              {this.state.transformNCamp.Valeur_optimiser.map(e => (
                <tr>
                  <td>
                    {e.id_q} - {e.intitule_q}
                  </td>

                  {/* VALEUR OPTIMISER - MAP SUR TRANSFORMN1CAMP POUR AFFICHER LES RESULTATS N-1 */}
                  {this.state.transformN1Camp.Valeur_optimiser.map(
                    e1 =>
                      e1.id_q === e.id_q ? (
                        <td className="TDResult">
                          {e1.reponse_r === 0 ? (
                            <img
                              src={IconCross}
                              alt="negativeIcon"
                              className="icon"
                            />
                          ) : e1.reponse_r === 1 ? (
                            <img
                              src={IconCheck}
                              alt="positiveIcon"
                              className="icon"
                            />
                          ) : (
                            <p>pas de rep</p>
                          )}
                        </td>
                      ) : null
                  )}
                  {/* VALEUR OPTIMISER - MAP SUR TRANSFORMNCAMP POUR AFFICHER LES RESULTATS N */}
                  <td className="TDResult">
                    {e.reponse_r === 0 ? (
                      <img
                        src={IconCross}
                        alt="negativeIcon"
                        className="icon"
                      />
                    ) : e.reponse_r === 1 ? (
                      <img
                        src={IconCheck}
                        alt="positiveIcon"
                        className="icon"
                      />
                    ) : (
                      <p>pas de rep</p>
                    )}{" "}
                  </td>
                </tr>
              ))}

              <tr>
                <td colSpan="4" className="tdSousChapitre">
                  De la valeur innovante
                </td>
              </tr>
              {this.state.transformNCamp.Valeur_innovante.map(e => (
                <tr>
                  <td>
                    {e.id_q} - {e.intitule_q}
                  </td>

                  {/* VALEUR INNOVANTE - MAP SUR TRANSFORMN1CAMP POUR AFFICHER LES RESULTATS N-1 */}
                  {this.state.transformN1Camp.Valeur_innovante.map(
                    e1 =>
                      e1.id_q === e.id_q ? (
                        <td className="TDResult">
                          {e1.reponse_r === 0 ? (
                            <img
                              src={IconCross}
                              alt="negativeIcon"
                              className="icon"
                            />
                          ) : e1.reponse_r === 1 ? (
                            <img
                              src={IconCheck}
                              alt="positiveIcon"
                              className="icon"
                            />
                          ) : (
                            <p>pas de rep</p>
                          )}
                        </td>
                      ) : null
                  )}
                  {/* VALEUR INNOVANTE - MAP SUR TRANSFORMNCAMP POUR AFFICHER LES RESULTATS N */}
                  <td className="TDResult">
                    {e.reponse_r === 0 ? (
                      <img
                        src={IconCross}
                        alt="negativeIcon"
                        className="icon"
                      />
                    ) : e.reponse_r === 1 ? (
                      <img
                        src={IconCheck}
                        alt="positiveIcon"
                        className="icon"
                      />
                    ) : (
                      <p>pas de rep</p>
                    )}{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Fragment>
      );

      //S'IL EXISTE UNE CAMPAGNE N, UNE CAMPAGNE N-1 ET UNE CAMPAGNE N-2
    } else if (this.state.allCamp.length === 3) {
      return (
        <Fragment>
          <Header
            header="header"
            className="buttonreturn"
            teamName={sessionStorage.getItem("currentFTName")}
            teamNameClass="header_team"
          />

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
              {/* PROCESS BASES - MAP SUR TRANSFORMNCAMP POUR AFFICHER LES QUESTIONS ET LES REPONSES DE LA CAMPAGNE N */}
              {this.state.transformNCamp.Process_bases.map(e => (
                <tr>
                  <td>
                    {e.id_q} - {e.intitule_q}
                  </td>

                  {/* PROCESS BASES - MAP SUR TRANSFORMN2CAMP POUR AFFICHER LES RESULTATS N-2 */}
                  {this.state.transformN2Camp.Process_bases.map(
                    e2 =>
                      e2.id_q === e.id_q ? (
                        <td className="TDResult">
                          {e2.reponse_r === 0 ? (
                            <img
                              src={IconCross}
                              alt="negativeIcon"
                              className="icon"
                            />
                          ) : e2.reponse_r === 1 ? (
                            <img
                              src={IconCheck}
                              alt="positiveIcon"
                              className="icon"
                            />
                          ) : (
                            <p>pas de rep</p>
                          )}
                        </td>
                      ) : null
                  )}
                  {/* PROCESS BASES - MAP SUR TRANSFORMN1CAMP POUR AFFICHER LES RESULTATS N-1 */}
                  {this.state.transformN1Camp.Process_bases.map(
                    e1 =>
                      e1.id_q === e.id_q ? (
                        <td className="TDResult">
                          {e1.reponse_r === 0 ? (
                            <img
                              src={IconCross}
                              alt="negativeIcon"
                              className="icon"
                            />
                          ) : e1.reponse_r === 1 ? (
                            <img
                              src={IconCheck}
                              alt="positiveIcon"
                              className="icon"
                            />
                          ) : (
                            <p>pas de rep</p>
                          )}
                        </td>
                      ) : null
                  )}
                  {/* PROCESS BASES - MAP SUR TRANSFORMNCAMP POUR AFFICHER LES RESULTATS N */}
                  <td className="TDResult">
                    {e.reponse_r === 0 ? (
                      <img
                        src={IconCross}
                        alt="negativeIcon"
                        className="icon"
                      />
                    ) : e.reponse_r === 1 ? (
                      <img
                        src={IconCheck}
                        alt="positiveIcon"
                        className="icon"
                      />
                    ) : (
                      <p>pas de rep</p>
                    )}
                  </td>
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
                  {/* PROCESS MAITRISER - MAP SUR TRANSFORMN2CAMP POUR AFFICHER LES RESULTATS N-2 */}
                  {this.state.transformN2Camp.Process_maitriser.map(
                    e2 =>
                      e2.id_q === e.id_q ? (
                        <td className="TDResult">
                          {e2.reponse_r === 0 ? (
                            <img
                              src={IconCross}
                              alt="negativeIcon"
                              className="icon"
                            />
                          ) : e2.reponse_r === 1 ? (
                            <img
                              src={IconCheck}
                              alt="positiveIcon"
                              className="icon"
                            />
                          ) : (
                            <p>pas de rep</p>
                          )}
                        </td>
                      ) : null
                  )}
                  {/* PROCESS MAITRISER - MAP SUR TRANSFORMN1CAMP POUR AFFICHER LES RESULTATS N-1 */}
                  {this.state.transformN1Camp.Process_maitriser.map(
                    e1 =>
                      e1.id_q === e.id_q ? (
                        <td className="TDResult">
                          {e1.reponse_r === 0 ? (
                            <img
                              src={IconCross}
                              alt="negativeIcon"
                              className="icon"
                            />
                          ) : e1.reponse_r === 1 ? (
                            <img
                              src={IconCheck}
                              alt="positiveIcon"
                              className="icon"
                            />
                          ) : (
                            <p>pas de rep</p>
                          )}
                        </td>
                      ) : null
                  )}
                  {/* PROCESS MAITRISER - MAP SUR TRANSFORMNCAMP POUR AFFICHER LES RESULTATS N */}
                  <td className="TDResult">
                    {e.reponse_r === 0 ? (
                      <img
                        src={IconCross}
                        alt="negativeIcon"
                        className="icon"
                      />
                    ) : e.reponse_r === 1 ? (
                      <img
                        src={IconCheck}
                        alt="positiveIcon"
                        className="icon"
                      />
                    ) : (
                      <p>pas de rep</p>
                    )}{" "}
                  </td>
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
                  {/* PROCESS AMELIORER - MAP SUR TRANSFORMN2CAMP POUR AFFICHER LES RESULTATS N-2 */}
                  {this.state.transformN2Camp.Process_ameliorer.map(
                    e2 =>
                      e2.id_q === e.id_q ? (
                        <td className="TDResult">
                          {e2.reponse_r === 0 ? (
                            <img
                              src={IconCross}
                              alt="negativeIcon"
                              className="icon"
                            />
                          ) : e2.reponse_r === 1 ? (
                            <img
                              src={IconCheck}
                              alt="positiveIcon"
                              className="icon"
                            />
                          ) : (
                            <p>pas de rep</p>
                          )}
                        </td>
                      ) : null
                  )}
                  {/*PROCESS AMELIORER -  MAP SUR TRANSFORMN1CAMP POUR AFFICHER LES RESULTATS N-1 */}
                  {this.state.transformN1Camp.Process_ameliorer.map(
                    e1 =>
                      e1.id_q === e.id_q ? (
                        <td className="TDResult">
                          {e1.reponse_r === 0 ? (
                            <img
                              src={IconCross}
                              alt="negativeIcon"
                              className="icon"
                            />
                          ) : e1.reponse_r === 1 ? (
                            <img
                              src={IconCheck}
                              alt="positiveIcon"
                              className="icon"
                            />
                          ) : (
                            <p>pas de rep</p>
                          )}
                        </td>
                      ) : null
                  )}
                  {/* PROCESS AMELIORER - MAP SUR TRANSFORMNCAMP POUR AFFICHER LES RESULTATS N */}
                  <td className="TDResult">
                    {e.reponse_r === 0 ? (
                      <img
                        src={IconCross}
                        alt="negativeIcon"
                        className="icon"
                      />
                    ) : e.reponse_r === 1 ? (
                      <img
                        src={IconCheck}
                        alt="positiveIcon"
                        className="icon"
                      />
                    ) : (
                      <p>pas de rep</p>
                    )}{" "}
                  </td>
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
                  {/* PROCESS AIDER - MAP SUR TRANSFORMN2CAMP POUR AFFICHER LES RESULTATS N-2 */}
                  {this.state.transformN2Camp.Process_aider.map(
                    e2 =>
                      e2.id_q === e.id_q ? (
                        <td className="TDResult">
                          {e2.reponse_r === 0 ? (
                            <img
                              src={IconCross}
                              alt="negativeIcon"
                              className="icon"
                            />
                          ) : e2.reponse_r === 1 ? (
                            <img
                              src={IconCheck}
                              alt="positiveIcon"
                              className="icon"
                            />
                          ) : (
                            <p>pas de rep</p>
                          )}
                        </td>
                      ) : null
                  )}
                  {/* PROCESS AIDER - MAP SUR TRANSFORMN1CAMP POUR AFFICHER LES RESULTATS N-1 */}
                  {this.state.transformN1Camp.Process_aider.map(
                    e1 =>
                      e1.id_q === e.id_q ? (
                        <td className="TDResult">
                          {e1.reponse_r === 0 ? (
                            <img
                              src={IconCross}
                              alt="negativeIcon"
                              className="icon"
                            />
                          ) : e1.reponse_r === 1 ? (
                            <img
                              src={IconCheck}
                              alt="positiveIcon"
                              className="icon"
                            />
                          ) : (
                            <p>pas de rep</p>
                          )}
                        </td>
                      ) : null
                  )}
                  {/* PROCESS AIDER - MAP SUR TRANSFORMNCAMP POUR AFFICHER LES RESULTATS N */}
                  <td className="TDResult">
                    {e.reponse_r === 0 ? (
                      <img
                        src={IconCross}
                        alt="negativeIcon"
                        className="icon"
                      />
                    ) : e.reponse_r === 1 ? (
                      <img
                        src={IconCheck}
                        alt="positiveIcon"
                        className="icon"
                      />
                    ) : (
                      <p>pas de rep</p>
                    )}{" "}
                  </td>
                </tr>
              ))}

              <tr>
                <td colSpan="4" className="tdChapitre">
                  QUALITE
                </td>
              </tr>

              {this.state.transformNCamp.Qualite.map(e => (
                <tr>
                  <td>
                    {e.id_q} - {e.intitule_q}
                  </td>
                  {/* QUALITE - MAP SUR TRANSFORMN2CAMP POUR AFFICHER LES RESULTATS N-2 */}
                  {this.state.transformN2Camp.Qualite.map(
                    e2 =>
                      e2.id_q === e.id_q ? (
                        <td className="TDResult">
                          {e2.reponse_r === 0 ? (
                            <img
                              src={IconCross}
                              alt="negativeIcon"
                              className="icon"
                            />
                          ) : e2.reponse_r === 1 ? (
                            <img
                              src={IconCheck}
                              alt="positiveIcon"
                              className="icon"
                            />
                          ) : (
                            <p>pas de rep</p>
                          )}
                        </td>
                      ) : null
                  )}
                  {/* QUALITE - MAP SUR TRANSFORMN1CAMP POUR AFFICHER LES RESULTATS N-1 */}
                  {this.state.transformN1Camp.Qualite.map(
                    e1 =>
                      e1.id_q === e.id_q ? (
                        <td className="TDResult">
                          {e1.reponse_r === 0 ? (
                            <img
                              src={IconCross}
                              alt="negativeIcon"
                              className="icon"
                            />
                          ) : e1.reponse_r === 1 ? (
                            <img
                              src={IconCheck}
                              alt="positiveIcon"
                              className="icon"
                            />
                          ) : (
                            <p>pas de rep</p>
                          )}
                        </td>
                      ) : null
                  )}
                  {/* QUALITE - MAP SUR TRANSFORMNCAMP POUR AFFICHER LES RESULTATS N */}
                  <td className="TDResult">
                    {e.reponse_r === 0 ? (
                      <img
                        src={IconCross}
                        alt="negativeIcon"
                        className="icon"
                      />
                    ) : e.reponse_r === 1 ? (
                      <img
                        src={IconCheck}
                        alt="positiveIcon"
                        className="icon"
                      />
                    ) : (
                      <p>pas de rep</p>
                    )}{" "}
                  </td>
                </tr>
              ))}

              <tr>
                <td colSpan="4" className="tdChapitre">
                  VALEUR
                </td>
              </tr>

              <tr>
                <td colSpan="4" className="tdSousChapitre">
                  Identifier la valeur
                </td>
              </tr>
              {this.state.transformNCamp.Valeur_identifier.map(e => (
                <tr>
                  <td>
                    {e.id_q} - {e.intitule_q}
                  </td>
                  {/* VALEUR IDENTIFIER - MAP SUR TRANSFORMN2CAMP POUR AFFICHER LES RESULTATS N-2 */}
                  {this.state.transformN2Camp.Valeur_identifier.map(
                    e2 =>
                      e2.id_q === e.id_q ? (
                        <td className="TDResult">
                          {e2.reponse_r === 0 ? (
                            <img
                              src={IconCross}
                              alt="negativeIcon"
                              className="icon"
                            />
                          ) : e2.reponse_r === 1 ? (
                            <img
                              src={IconCheck}
                              alt="positiveIcon"
                              className="icon"
                            />
                          ) : (
                            <p>pas de rep</p>
                          )}
                        </td>
                      ) : null
                  )}
                  {/* VALEUR IDENTIFIER - MAP SUR TRANSFORMN1CAMP POUR AFFICHER LES RESULTATS N-1 */}
                  {this.state.transformN1Camp.Valeur_identifier.map(
                    e1 =>
                      e1.id_q === e.id_q ? (
                        <td className="TDResult">
                          {e1.reponse_r === 0 ? (
                            <img
                              src={IconCross}
                              alt="negativeIcon"
                              className="icon"
                            />
                          ) : e1.reponse_r === 1 ? (
                            <img
                              src={IconCheck}
                              alt="positiveIcon"
                              className="icon"
                            />
                          ) : (
                            <p>pas de rep</p>
                          )}
                        </td>
                      ) : null
                  )}
                  {/* VALEUR IDENTIFIER - MAP SUR TRANSFORMNCAMP POUR AFFICHER LES RESULTATS N */}
                  <td className="TDResult">
                    {e.reponse_r === 0 ? (
                      <img
                        src={IconCross}
                        alt="negativeIcon"
                        className="icon"
                      />
                    ) : e.reponse_r === 1 ? (
                      <img
                        src={IconCheck}
                        alt="positiveIcon"
                        className="icon"
                      />
                    ) : (
                      <p>pas de rep</p>
                    )}{" "}
                  </td>
                </tr>
              ))}

              <tr>
                <td colSpan="4" className="tdSousChapitre">
                  Se concentrer sur la valeur
                </td>
              </tr>
              {this.state.transformNCamp.Valeur_concentrer.map(e => (
                <tr>
                  <td>
                    {e.id_q} - {e.intitule_q}
                  </td>
                  {/* VALEUR CONCENTRER - MAP SUR TRANSFORMN2CAMP POUR AFFICHER LES RESULTATS N-2 */}
                  {this.state.transformN2Camp.Valeur_concentrer.map(
                    e2 =>
                      e2.id_q === e.id_q ? (
                        <td className="TDResult">
                          {e2.reponse_r === 0 ? (
                            <img
                              src={IconCross}
                              alt="negativeIcon"
                              className="icon"
                            />
                          ) : e2.reponse_r === 1 ? (
                            <img
                              src={IconCheck}
                              alt="positiveIcon"
                              className="icon"
                            />
                          ) : (
                            <p>pas de rep</p>
                          )}
                        </td>
                      ) : null
                  )}
                  {/* VALEUR CONCENTRER - MAP SUR TRANSFORMN1CAMP POUR AFFICHER LES RESULTATS N-1 */}
                  {this.state.transformN1Camp.Valeur_concentrer.map(
                    e1 =>
                      e1.id_q === e.id_q ? (
                        <td className="TDResult">
                          {e1.reponse_r === 0 ? (
                            <img
                              src={IconCross}
                              alt="negativeIcon"
                              className="icon"
                            />
                          ) : e1.reponse_r === 1 ? (
                            <img
                              src={IconCheck}
                              alt="positiveIcon"
                              className="icon"
                            />
                          ) : (
                            <p>pas de rep</p>
                          )}
                        </td>
                      ) : null
                  )}
                  {/* VALEUR CONCENTRER - MAP SUR TRANSFORMNCAMP POUR AFFICHER LES RESULTATS N */}
                  <td className="TDResult">
                    {e.reponse_r === 0 ? (
                      <img
                        src={IconCross}
                        alt="negativeIcon"
                        className="icon"
                      />
                    ) : e.reponse_r === 1 ? (
                      <img
                        src={IconCheck}
                        alt="positiveIcon"
                        className="icon"
                      />
                    ) : (
                      <p>pas de rep</p>
                    )}{" "}
                  </td>
                </tr>
              ))}

              <tr>
                <td colSpan="4" className="tdSousChapitre">
                  Livrer de la valeur
                </td>
              </tr>
              {this.state.transformNCamp.Valeur_livrer.map(e => (
                <tr>
                  <td>
                    {e.id_q} - {e.intitule_q}
                  </td>
                  {/* VALEUR LIVRER - MAP SUR TRANSFORMN2CAMP POUR AFFICHER LES RESULTATS N-2 */}
                  {this.state.transformN2Camp.Valeur_livrer.map(
                    e2 =>
                      e2.id_q === e.id_q ? (
                        <td className="TDResult">
                          {e2.reponse_r === 0 ? (
                            <img
                              src={IconCross}
                              alt="negativeIcon"
                              className="icon"
                            />
                          ) : e2.reponse_r === 1 ? (
                            <img
                              src={IconCheck}
                              alt="positiveIcon"
                              className="icon"
                            />
                          ) : (
                            <p>pas de rep</p>
                          )}
                        </td>
                      ) : null
                  )}
                  {/* VALEUR LIVRER - MAP SUR TRANSFORMN1CAMP POUR AFFICHER LES RESULTATS N-1 */}
                  {this.state.transformN1Camp.Valeur_livrer.map(
                    e1 =>
                      e1.id_q === e.id_q ? (
                        <td className="TDResult">
                          {e1.reponse_r === 0 ? (
                            <img
                              src={IconCross}
                              alt="negativeIcon"
                              className="icon"
                            />
                          ) : e1.reponse_r === 1 ? (
                            <img
                              src={IconCheck}
                              alt="positiveIcon"
                              className="icon"
                            />
                          ) : (
                            <p>pas de rep</p>
                          )}
                        </td>
                      ) : null
                  )}
                  {/* VALEUR LIVRER - MAP SUR TRANSFORMNCAMP POUR AFFICHER LES RESULTATS N */}
                  <td className="TDResult">
                    {e.reponse_r === 0 ? (
                      <img
                        src={IconCross}
                        alt="negativeIcon"
                        className="icon"
                      />
                    ) : e.reponse_r === 1 ? (
                      <img
                        src={IconCheck}
                        alt="positiveIcon"
                        className="icon"
                      />
                    ) : (
                      <p>pas de rep</p>
                    )}{" "}
                  </td>
                </tr>
              ))}

              <tr>
                <td colSpan="4" className="tdSousChapitre">
                  Optimiser la valeur
                </td>
              </tr>
              {this.state.transformNCamp.Valeur_optimiser.map(e => (
                <tr>
                  <td>
                    {e.id_q} - {e.intitule_q}
                  </td>
                  {/* VALEUR OPTIMISER - MAP SUR TRANSFORMN2CAMP POUR AFFICHER LES RESULTATS N-2 */}
                  {this.state.transformN2Camp.Valeur_optimiser.map(
                    e2 =>
                      e2.id_q === e.id_q ? (
                        <td className="TDResult">
                          {e2.reponse_r === 0 ? (
                            <img
                              src={IconCross}
                              alt="negativeIcon"
                              className="icon"
                            />
                          ) : e2.reponse_r === 1 ? (
                            <img
                              src={IconCheck}
                              alt="positiveIcon"
                              className="icon"
                            />
                          ) : (
                            <p>pas de rep</p>
                          )}
                        </td>
                      ) : null
                  )}
                  {/* VALEUR OPTIMISER - MAP SUR TRANSFORMN1CAMP POUR AFFICHER LES RESULTATS N-1 */}
                  {this.state.transformN1Camp.Valeur_optimiser.map(
                    e1 =>
                      e1.id_q === e.id_q ? (
                        <td className="TDResult">
                          {e1.reponse_r === 0 ? (
                            <img
                              src={IconCross}
                              alt="negativeIcon"
                              className="icon"
                            />
                          ) : e1.reponse_r === 1 ? (
                            <img
                              src={IconCheck}
                              alt="positiveIcon"
                              className="icon"
                            />
                          ) : (
                            <p>pas de rep</p>
                          )}
                        </td>
                      ) : null
                  )}
                  {/* VALEUR OPTIMISER - MAP SUR TRANSFORMNCAMP POUR AFFICHER LES RESULTATS N */}
                  <td className="TDResult">
                    {e.reponse_r === 0 ? (
                      <img
                        src={IconCross}
                        alt="negativeIcon"
                        className="icon"
                      />
                    ) : e.reponse_r === 1 ? (
                      <img
                        src={IconCheck}
                        alt="positiveIcon"
                        className="icon"
                      />
                    ) : (
                      <p>pas de rep</p>
                    )}{" "}
                  </td>
                </tr>
              ))}

              <tr>
                <td colSpan="4" className="tdSousChapitre">
                  De la valeur innovante
                </td>
              </tr>
              {this.state.transformNCamp.Valeur_innovante.map(e => (
                <tr>
                  <td>
                    {e.id_q} - {e.intitule_q}
                  </td>
                  {/* VALEUR INNOVANTE - MAP SUR TRANSFORMN2CAMP POUR AFFICHER LES RESULTATS N-2 */}
                  {this.state.transformN2Camp.Valeur_innovante.map(
                    e2 =>
                      e2.id_q === e.id_q ? (
                        <td className="TDResult">
                          {e2.reponse_r === 0 ? (
                            <img
                              src={IconCross}
                              alt="negativeIcon"
                              className="icon"
                            />
                          ) : e2.reponse_r === 1 ? (
                            <img
                              src={IconCheck}
                              alt="positiveIcon"
                              className="icon"
                            />
                          ) : (
                            <p>pas de rep</p>
                          )}
                        </td>
                      ) : null
                  )}
                  {/* VALEUR INNOVANTE - MAP SUR TRANSFORMN1CAMP POUR AFFICHER LES RESULTATS N-1 */}
                  {this.state.transformN1Camp.Valeur_innovante.map(
                    e1 =>
                      e1.id_q === e.id_q ? (
                        <td className="TDResult">
                          {e1.reponse_r === 0 ? (
                            <img
                              src={IconCross}
                              alt="negativeIcon"
                              className="icon"
                            />
                          ) : e1.reponse_r === 1 ? (
                            <img
                              src={IconCheck}
                              alt="positiveIcon"
                              className="icon"
                            />
                          ) : (
                            <p>pas de rep</p>
                          )}
                        </td>
                      ) : null
                  )}
                  {/* VALEUR INNOVANTE - MAP SUR TRANSFORMNCAMP POUR AFFICHER LES RESULTATS N */}
                  <td className="TDResult">
                    {e.reponse_r === 0 ? (
                      <img
                        src={IconCross}
                        alt="negativeIcon"
                        className="icon"
                      />
                    ) : e.reponse_r === 1 ? (
                      <img
                        src={IconCheck}
                        alt="positiveIcon"
                        className="icon"
                      />
                    ) : (
                      <p>pas de rep</p>
                    )}{" "}
                  </td>
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
