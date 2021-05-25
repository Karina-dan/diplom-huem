import React, {useState} from 'react';
import {Portal, Modal, Title, Button, Divider, Checkbox, Paragraph} from 'react-native-paper';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {theme} from '../../theme';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

export const Filters = ({filters, setFilters, constsMinMax}) => {
  const [localFilters, setLocalFilters] = useState({
    discount: filters.discount,
    guarantee: filters.guarantee,
    price: {
      min: filters.price.min,
      max: filters.price.max,
    },
  });

  const acceptFilters = () => {
    setFilters({
      visible: false,
      ...localFilters,
    });
  };

  const clearFilters = () => {
    setLocalFilters({
      discount: false,
      guarantee: false,
      price: {
        min: constsMinMax.min,
        max: constsMinMax.max,
      },
    })
    setFilters({
      visible: false,
      discount: false,
      guarantee: false,
      price: {
        min: constsMinMax.min,
        max: constsMinMax.max,
      },
    })
  };

  return (
      <Portal>
        <Modal 
          visible={filters.visible} 
          contentContainerStyle={styles.modal}
          onDismiss={() => setFilters({...filters, visible: false})}
        >
          <View style={styles.container}>
            <View style={styles.top}>
              <Title style={styles.headerText}>Filters</Title>
            </View>
            <Divider style={styles.divider}/>
            <View style={styles.main}>
              <TouchableOpacity style={{...styles.row, ...styles.checkboxContainer}} onPress={
                () => setLocalFilters({...localFilters, guarantee: !localFilters.guarantee})
              }>
                <Checkbox 
                  label="Item" 
                  status={localFilters.guarantee ? 'checked' : 'unchecked'} 
                />
                <Title>With guarantee</Title>
              </TouchableOpacity>
              <TouchableOpacity style={{...styles.row, ...styles.checkboxContainer}} onPress={
                () => setLocalFilters({...localFilters, discount: !localFilters.discount})
              }>
                <Checkbox
                  label="Item"
                  status={localFilters.discount ? 'checked' : 'unchecked'} 
                />
                <Title>With discount</Title>
              </TouchableOpacity>
              <MultiSlider
                values={[localFilters.price.min, localFilters.price.max]}
                onValuesChange={([min, max]) => setLocalFilters({
                  ...localFilters, 
                  price: {
                    min: min,
                    max: max
                  }
                })}
                min={constsMinMax.min}
                max={constsMinMax.max}
                step={1}
                sliderLength={250}
              />
              <View style={styles.priceContainer}>
                <View style={styles.start}>
                  <Paragraph>{localFilters.price.min}</Paragraph>
                  <Paragraph>min.</Paragraph>
                </View>
                <Title>Price</Title>
                <View style={styles.end}>
                  <Paragraph>{localFilters.price.max}</Paragraph>
                  <Paragraph>max.</Paragraph>
                </View>
              </View>
            </View>
            <View style={styles.clear}>
              <Button
                mode='contained'
                onPress={() => clearFilters()}
              >Clear filters</Button>
            </View>
            <Divider style={styles.divider}/>
            <View style={styles.bottom}>
              <Button
                style={styles.button}
                mode="contained"
                color={theme.colors.accent}
                onPress={() => setFilters({...filters, visible: false})}
              >Cancel
              </Button>
              <Button
                style={styles.button}
                mode="contained"
                color={theme.colors.error}
                onPress={() => acceptFilters()}
              >Accept
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
  )
};

const styles = StyleSheet.create({
  modal: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    width: '80%',
    height: '80%',
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    padding: 20,
  },
  divider: {
    marginTop: 5,
    marginBottom: 5,
    height: 3,
    backgroundColor: theme.colors.accent
  },
  top: {
    flex: 0.1,
  },
  main: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row'
  },
  clear: {
    flex: 0.1,
  },
  bottom: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  button: {
    marginRight: 10
  },
  checkboxContainer: {
    width: '80%',
    justifyContent: 'flex-start'
  },
  priceContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  start: {
    alignItems: 'flex-start'
  },
  end: {
    alignItems: 'flex-end'
  }
})