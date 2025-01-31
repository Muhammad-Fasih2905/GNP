import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GlobalIcon from '../../utils/GlobalIcon'
import Button from '../../components/AppButton'
import Input from '../../components/AppInput'

const GetStartedScreen = () => {
    return (
        <View>
            <Text>GetStartedScreen</Text>
            <GlobalIcon name={'stepforward'} library='AntDesign' size={43} color={'red'} />

            {/* // Primary button (yellow) */}
            <Button
                title="ADD TO CART"
                onPress={() => {/* handle press */ }}
                icon={<GlobalIcon name={'stepforward'} library='AntDesign' size={40} color={'black'} />}
                style={{ width: '80%', alignSelf: 'center' }}
            />

            {/* // Secondary button (blue) */}
            <Button
                title="LOGIN"
                variant="secondary"
                onPress={() => {/* handle login */ }}

            />

            {/* // Outline button */}
            <Button
                title="SIGN UP"
                variant="outline"
                onPress={() => {/* handle sign up */ }}

            />

            {/* // Disabled button */}
            <Button
                title="READ SAMPLE"
                onPress={() => {/* handle read sample */ }}

                disabled
            />


            {/* app input   */}

            <Input
                label="Password"
                placeholder="Enter your password"
                secureTextEntry={true}
            />
            <Input
                label="Password"
                placeholder="Enter your password"
                keyboardType='default'
            />
        </View>
    )
}

export default GetStartedScreen

const styles = StyleSheet.create({})