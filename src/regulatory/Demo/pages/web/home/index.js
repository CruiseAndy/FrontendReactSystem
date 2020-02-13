/* tool */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

/* actions */
import {
	getCommunityGames,
	getGameLogInUrl,
	setGlobalErrMsg
} from "../../../../../actions";

/* components */
import SiteConfig from "../../../config";
import NewsPTN from "../../../../../pattern/news/sunbet";

import "./index.scss";

const Home = props => {

	const casinoList = [
		{
			title: props.intl.formatMessage({id: "casinoGames.item1"}),
			img: require("../../../images/casino/item1.png")
		},
		{
			title: props.intl.formatMessage({id: "casinoGames.item2"}),
			img: require("../../../images/casino/item2.png")
		},
		{
			title: props.intl.formatMessage({id: "casinoGames.item3"}),
			img: require("../../../images/casino/item3.png")
		},
		{
			title: props.intl.formatMessage({id: "casinoGames.item4"}),
			img: require("../../../images/casino/item4.png")
		},
		{
			title: props.intl.formatMessage({id: "casinoGames.item5"}),
			img: require("../../../images/casino/item5.png")
		},
		{
			title: props.intl.formatMessage({id: "casinoGames.item6"}),
			img: require("../../../images/casino/item6.png")
		}
	];

	const [ casinoUrl, setCasinoUrl ] = useState("");

	useEffect(() => {
		window.scrollTo(0, 0);

		const apiParams = {
			is_mobile: props.device == "mobile",
			category: "casino"
		}

		props.getCommunityGames(props.intl, apiParams)
		.then(res => {
			setCasinoUrl(res.casino[0].game_url);
		})
		.catch(err => {
      props.setGlobalErrMsg(err.message);
		})
	}, []);

	const goGame = () => {
		if (!props.userLoginRlt) {
      props.setGlobalErrMsg(props.intl.formatMessage({id: "unLogin"}));
			return;
		}

		props.getGameLogInUrl(props.intl, props.userLoginRlt.auth_token, casinoUrl)
		.then(res => {
			window.open(res.login_url, "_blank");
		})
		.catch(err => {
      props.setGlobalErrMsg(err.message);
		})
	}
	
	return (
		<div className="home_page">
			<div className="home_container">
				<div className="casino_section">
					<div className="casino_banner">
						<NewsPTN company={SiteConfig.company} device={props.device} />
					</div>
					<div className="casino_games_box">
					{
						casinoList.map((item, index) => {
							const { title, img } = item;

							return (
								<div key={index} className="game_box" onClick={() => goGame()}>
									<img src={img} />
									<span className="game_title">{title}</span>
									<div className="go_game">
										<span className="go_game_txt">{props.intl.formatMessage({id: "goGame"})}</span>
										<span className="icon_triangle_right" />
									</div>
								</div>
							);
						})
					}
					</div>
				</div>
				<div className="other_section">
					<div className="home_banner">
						<img src={require("../../../images/home-banner.png")} />
					</div>
					<div className="home_news">
						<NewsPTN company={SiteConfig.company} device={props.device} />
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = ({ UserAuthData }) => {
	const { userLoginRlt } = UserAuthData
	return { userLoginRlt };
};

export default connect(mapStateToProps, {
	getCommunityGames,
	getGameLogInUrl,
	setGlobalErrMsg
})(withRouter(injectIntl(Home)));