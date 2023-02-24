import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/colors";
import { PrimaryButton } from "../components/Button";

import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../../features/basketSlice";
// import DelIcon from "react-native-vector-icons/MaterialIcons";

const CartScreen = () => {
  const navigation = useNavigation();
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  const dispatch = useDispatch();

  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Cart</Text>
      </View>

      <ScrollView>
        {Object.entries(groupedItemsInBasket).map(([key, items]) => (
          <View style={style.cartCard} key={key}>
            <Image
              source={{ uri: items[0]?.firstImage }}
              style={{ height: 80, width: 80 }}
            />
            <View
              style={{
                height: 100,
                marginLeft: 10,
                paddingVertical: 20,
                flex: 1,
              }}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 16 }}
                numberOfLines={1}
              >
                {items[0].title}
              </Text>

              <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 10 }}>
                ${items[0]?.price}
              </Text>
            </View>
            <View style={{ marginRight: 20, alignItems: "center" }}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                x{items.length}
              </Text>
            </View>
            {/* <TouchableOpacity
              onPress={() => dispatch(removeFromBasket({ id: key }))}
            >
              <DelIcon name="delete-forever" size={26} color={COLORS.primary} />
            </TouchableOpacity> */}
            {console.log({ id: key })}
          </View>
        ))}
        {/* Test  */}
        <View
          style={{ paddingHorizontal: 20, marginTop: 20, marginBottom: 10 }}
        >
          <View style={{ marginHorizontal: 30 }}>
            <PrimaryButton title="CHECKOUT" />
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor: COLORS.primary,
          height: 40,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
            marginTop: 10,
          }}
        >
          <Text
            style={{ color: COLORS.white, fontSize: 16, fontWeight: "600" }}
          >
            Order Total:{" "}
          </Text>
          <Text
            style={{ color: COLORS.white, fontSize: 16, fontWeight: "600" }}
          >
            ${basketTotal}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  cartCard: {
    height: 100,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  actionBtn: {
    width: 80,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
});

export default CartScreen;
