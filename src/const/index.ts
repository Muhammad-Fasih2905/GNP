import { Dimensions, StatusBar } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";

export const screen_width = Dimensions.get('window').width;
export const screen_height = Dimensions.get('window').height;

export const wp = (widthPercent: any) => widthPercentageToDP(widthPercent);
export const hp = (heightPercent: any) => heightPercentageToDP(heightPercent);


export const StatusBarHeight = () => {
    return StatusBar.currentHeight;
}