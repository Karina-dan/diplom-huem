import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {theme} from '../../theme';
import { ProductCard } from './ProductCard';
import {Sorter} from './Sorter';
import {Filters} from './Filters';
import {Title, Divider, Paragraph} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SORTS} from '../consts';
import {useShop} from '../hooks/useShop';
import {sortItems} from '../functions/sortItems';
import {countDiscount} from '../functions/countDiscount';
import {filterItems} from '../functions/filterItems';
import {calculateMinMaxPrice} from '../functions/calculateMinMaxPrice';

export const ProductList = ({route, navigation}) => {
  const [sort, setSort] = useState({
    type: SORTS[0],
    reverse: false,
  });
  const [filters, setFilters] = useState({
    visible: false,
    discount: false,
    guarantee: false,
    price: calculateMinMaxPrice(route.params.productList),
  });

  

  const renderProducts = () => {
    const noFiltered = route.params.productList;
    countDiscount(noFiltered);
    const filtered = filterItems(filters, noFiltered);
    sortItems(sort, filtered);
    return filtered.map(prod => (
      <ProductCard
        key={prod.model}
        prod={prod}
        navigation={navigation}
      />
    ))
  }

  return (
    <View style={styles.container}>
      <View style={styles.optContainer}>
        <Sorter
          sort={sort}
          setSort={setSort}
        />
        <Divider style={styles.divider} />
        <TouchableOpacity 
          style={styles.filterContainer}
          onPress={() => setFilters({...filters, visible: true})}
        >
          <Icon name='filter' color={theme.colors.text} size={20} style={styles.filterIcon}/>
          <Title style={{marginRight: 20}}>Filter...</Title>
          {
            filters.guarantee
            ? <Icon name='shield' color={theme.colors.text} size={20} style={styles.filterIcon}/>
            : null
          }
          {
            filters.discount
            ? <Icon name='percent' color={theme.colors.text} size={20} style={styles.filterIcon}/>
            : null
          }
          {
            filters.price.min && filters.price.max
            ? <Paragraph>{filters.price.min}$ - {filters.price.max}$</Paragraph>
            : null
          }
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        {renderProducts()}
      </ScrollView>
      <Filters
        filters={filters}
        setFilters={setFilters}
        constsMinMax={calculateMinMaxPrice(route.params.productList)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  optContainer: {
    backgroundColor: theme.colors.primary,
    padding: 10
  },
  scroll: {
    paddingVertical: 20
  },
  filterContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  filterIcon: {
    marginRight: 10,
    marginLeft: 5
  },
  divider: {
    height: 3,
    backgroundColor: theme.colors.accent,
    marginTop: 5
  }
})
