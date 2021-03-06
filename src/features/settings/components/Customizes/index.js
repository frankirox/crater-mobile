// @flow

import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { ListView, DefaultLayout } from '../../../../components';
import { ROUTES } from '../../../../navigation/routes';
import { colors } from '../../../../styles/colors';
import Lng from '../../../../api/lang/i18n';
import { CUSTOMIZES_MENU } from '../../constants';
import { MOUNT, goBack, UNMOUNT } from '../../../../navigation/actions';

export class Customizes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    componentDidMount() {

        const {
            navigation,
            getCustomizeSettings,
            getPaymentModes,
            getItemUnits
        } = this.props

        getCustomizeSettings()
        getPaymentModes()
        getItemUnits()

        goBack(MOUNT, navigation)
    }

    componentWillUnmount() {
        goBack(UNMOUNT)
    }

    onSelectMenu = ({ route, type }) => {
        const { navigation } = this.props

        if (route) {
            navigation.navigate(route, { type })
        }
    }

    render() {
        const {
            navigation,
            language,
            paymentModesLoading,
            itemUnitsLoading
        } = this.props;

        let loading = paymentModesLoading || itemUnitsLoading

        return (
            <View style={styles.container}>
                <DefaultLayout
                    headerProps={{
                        leftIconPress: () => navigation.navigate(ROUTES.SETTING_LIST),
                        title: Lng.t("header.customize", { locale: language }),
                        leftIconStyle: { color: colors.dark2 }
                    }}
                    hasSearchField={false}
                    loadingProps={{ is: loading }}
                >
                    <View style={styles.listViewContainer}>
                        <ListView
                            items={CUSTOMIZES_MENU(language, Lng)}
                            onPress={this.onSelectMenu}
                            leftTitleStyle={styles.listViewTitle}
                            listItemProps={{
                                chevron: {
                                    size: 18,
                                    color: colors.darkGray,
                                    containerStyle: { marginTop: 5 }
                                },
                            }}
                        />
                    </View>
                </DefaultLayout>
            </View>
        );
    }
}
