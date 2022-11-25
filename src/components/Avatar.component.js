import React from "react";
//import propTypes from "prop-types";
import { View } from "react-native";
import { Avatar as Avatar2, Text } from "@ui-kitten/components";

const Avatar = (props) => {
	const { size, source, name, color, ...restProps } = props;

	const getSize = (imageSize, dimension) => {
		switch (imageSize) {
			case "tiny":
				if (dimension === "font") return "c1";
				return 24;
			case "small":
				if (dimension === "font") return "p2";
				return 30;
			case "medium":
				if (dimension === "font") return "p1";
				return 40;
			case "large":
				if (dimension === "font") return "h5";
				return 48;
			case "giant":
				if (dimension === "font") return "h4";
				return 68;
			default:
				return null;
		}
	};

	const getInitials = (text) => {
		const fullName = text.trim().split(" ");
		let initials = fullName[0].charAt(0);
		if (fullName.length > 1) {
			initials += fullName[fullName.length - 1].charAt(0);
		} else {
			initials += fullName[0].charAt(1);
		}
		return initials.toUpperCase();
	};

	return (
		<View>
			{!source ? (
				<View
					style={{
						width: getSize(size, "width"),
						height: getSize(size, "height"),
						borderRadius: getSize(size, "width") / 2,
						backgroundColor: "black",
						justifyContent: "center",
					}}
				>
					<Text
						category={getSize(size, "font")}
						style={{
							textAlign: "center",
						}}
					>
						{getInitials(name)}
					</Text>
				</View>
			) : (
				<Avatar2
					source={{
						uri: source,
					}}
					size={size}
					{...restProps}
				/>
			)}
		</View>
	);
};

export default Avatar;

Avatar.defaultProps = {
	name: "",
	source: "",
	color: "",
};

// Avatar.propTypes = {
// 	size: propTypes.string.isRequired,
// 	color: propTypes.string,
// 	source: propTypes.string,
// 	name: propTypes.string,
// };
