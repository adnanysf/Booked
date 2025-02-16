import { Tabs } from "expo-router";
import TabBar from "../../components/TabBar";

export default function RootLayout() {
    return(
        <Tabs
            tabBar={props => <TabBar {...props}/>}
        >
            <Tabs.Screen name="home" options={{headerShown:false}}/>
            <Tabs.Screen name="account" options={{headerShown:false}}/>
            <Tabs.Screen name="time" options={{headerShown:false}}/>
            <Tabs.Screen name="friends" options={{headerShown:false}}/>
            <Tabs.Screen name="library" options={{headerShown:false}}/>
        </Tabs>
    )
}