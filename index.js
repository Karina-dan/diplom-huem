import React, {useState} from 'react';
import {View, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {Appbar, Title, Button, IconButton, Badge, Divider, Paragraph} from 'react-native-paper';
import {createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer';
import {theme} from '../../theme';
import {Home} from './Home';
import {Purchases} from './Purchases';
import {Manage} from './Manage';
import {useAuth} from '../hooks/useAuth';
import {useShop} from '../hooks/useShop';
import {useSelector} from 'react-redux';
import {Promo} from '../components/Promo';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const [visiblePromo, setVisiblePromo] = useState(false);

  return (
    <KeyboardAvoidingView behavior='height' style={styles.container}>
        <View style={styles.top}>
            <View style={styles.userContainer}>
              <View>
                {
                  props.logged
                  ? <>
                      <Title>Welcome,</Title>
                      <Paragraph>{props.email}</Paragraph>
                    </>
                  : <>
                      <Button
                        style={styles.userButton}
                        mode="contained"
                        color={theme.colors.accent}
                        onPress={() => props.navigation.navigate('Auth', {switch: false})}
                      >Log In</Button>
                      <Button
                        style={styles.userButton}
                        mode="contained"
                        color={theme.colors.accent}
                        onPress={() => props.navigation.navigate('Auth', {switch: true})}
                      >Sign In</Button>
                    </>
                }
              </View>
              <View style={styles.userCartContainer}>
                <IconButton
                  disabled={props.cart.quantity === 0}
                  icon="cart"
                  color={theme.colors.background}
                  size={50}
                  onPress={() => props.navigation.navigate('ShoppingCart')}
                />
                <Badge
                  size={35}
                  style={styles.cartBadge}
                >{props.cart.quantity}</Badge>
              </View>
            </View>
        </View>
      <View style={styles.routes}>
        <DrawerItemList {...props} />
      </View>
      <View style={styles.main}>
        <View style={styles.balance}>
          <View style={styles.balanceTextContainer}>
            {
              props.logged
              ? <>
                  <Title style={styles.balanceText}>Bonus account</Title>
                  <Divider style={styles.divider}/>
                  <Title style={styles.balanceText}>{props.bonus}$</Title>
                </>
              : <Title>To use bonus account you need to log in</Title>
            }
          </View>
        </View>
        <View>
          <Button
            mode="contained"
            color={theme.colors.accent}
            style={styles.promo}
            disabled={!props.logged}
            onPress={() => setVisiblePromo(true)}
          >I have a promocode</Button>
        </View>
      </View>
      <View style={styles.bottom}>
        <Appbar style={styles.optionsContainer}>
          <Appbar.Action 
            color={theme.colors.text} 
            size={40} 
            icon="web" 
            onPress={() => console.log('Pressed web')} 
          />
          <Appbar.Action 
            color={theme.colors.text} 
            size={40} 
            icon="comment-question-outline" 
            onPress={() => props.navigation.navigate('About')} 
          />
          <Appbar.Action 
            disabled={!props.logged} 
            color={theme.colors.text} 
            size={40} 
            icon="exit-run" 
            onPress={() => props.logout()} 
          />
        </Appbar>
        <Promo 
          visible={visiblePromo}
          setVisible={setVisiblePromo}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

export const ShopNavigation = () => {
  const user = useSelector(state => state.user);
  const {reverseAuth} = useAuth();
  const {cart} = useShop();

    return (
        <Drawer.Navigator
          drawerContent={props => (
            <CustomDrawerContent 
              {...props} 
              logged={user.logged} 
              email={user.email}
              logout={reverseAuth}
              cart={cart}
              bonus={user.bonus}
            />
          )}
          initialRouteName="Home"
          drawerType="back"
          drawerStyle={{
            width: '70%',
            backgroundColor: theme.colors.primary,
          }}
          drawerContentOptions={{
            labelStyle: {
              fontSize: 20,
              padding: 3,
              textTransform: 'uppercase',
            },
            activeBackgroundColor: theme.colors.accent,
            activeTintColor: theme.colors.text,
            inactiveTintColor: theme.colors.text,
          }}
        >
          {
            user.logged
            ? <>
                <Drawer.Screen name='Products' component={Home} />
                <Drawer.Screen name='Purchase history' component={Purchases} />
                <Drawer.Screen name='Manage' component={Manage} />
              </>
            : <Drawer.Screen name='Products' component={Home} />
          }
        </Drawer.Navigator>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 0.2,
  },
  routes: {
    flex: 0.35,
  },
  main: {
    flex: 0.35,
    justifyContent: 'flex-end',
    padding: 5,
  },
  balance: {
    backgroundColor: theme.colors.accent,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  },
  balanceTextContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  balanceText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  promo: {
    marginTop: 10,
    marginBottom: 20,
  },
  bottom: {
    flex: 0.1,
  },
  userContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  userButton: {
    width: '100%',
    margin: 2,
  },
  optionsContainer: {
    backgroundColor: theme.colors.accent,
    justifyContent: 'space-around',
  },
  rightText: {
    textAlign: 'right',
  },
  cartBadge: {
    position: 'absolute',
    backgroundColor: theme.colors.accent,
  },
  divider: {
    backgroundColor: theme.colors.primary,
    height: 3,
    width: '100%',
  },
});

