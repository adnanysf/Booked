import { Tabs } from "expo-router";

export default function RootLayout() {
    return(
        <Tabs>
            <Tabs.Screen name="home"/>
            <Tabs.Screen name="account" />
            <Tabs.Screen name="friends"/>
            <Tabs.Screen name="time"/>
        </Tabs>
    )
}