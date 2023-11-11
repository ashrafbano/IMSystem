import { View, Text, FlatList, RefreshControl } from "react-native";
import { useEffect, useState } from "react";
import { AppHeader } from "../components/AppHeader";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../redux/store";
import { getFeedbacks } from "../redux/actions/feedbackActions";
import { ActivityIndicator, Button } from "react-native-paper";
import { moderateScale } from "../utils/fontScaling";
import { TouchableOpacity } from "react-native-gesture-handler";
import StarRating from "react-native-star-rating-widget";
import { Ionicons } from "@expo/vector-icons";

function generateRandomId(partsCount: number = 5, charactersCount: number = 5) {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let randomId = "";

  for (let i = 0; i < partsCount; i++) {
    for (let j = 0; j < charactersCount; j++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters.charAt(randomIndex);
    }

    if (i < partsCount - 1) {
      randomId += "-";
    }
  }

  return randomId;
}

export const AdminFoodFeedback = () => {
  const dispatch = useDispatch<any>();
  const [feeds, setFeeds] = useState([]);
  const { feedbacks, getFeedbackLoading, getFeedbackError } = useAppSelector(
    (state) => state.feedback
  );
  useEffect(() => {
    dispatch(getFeedbacks());
  }, [dispatch]);

  useEffect(() => {
    setFeeds(
      feedbacks.map((el: any) => ({
        ...el,
        expanded: false,
        id: generateRandomId(),
      }))
    );
  }, [feedbacks]);

  const updateExpanded = (id: string) => {
    setFeeds(
      feeds.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            expanded: !el.expanded,
          };
        }

        return el;
      })
    );
  };

  if (getFeedbackLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <AppHeader />
        <View
          style={{
            flex: 0.8,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator />
        </View>
      </View>
    );
  }
  if (!feedbacks || feedbacks.length === 0) {
    return (
      <>
        <AppHeader />

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
          }}
        >
          <View
            style={{
              paddingHorizontal: moderateScale(18),
              paddingVertical: moderateScale(10),
              borderRadius: moderateScale(8),
            }}
          >
            <Text
              style={{
                fontFamily: "PoppinsMedium",
                letterSpacing: 1.1,
              }}
            >
              No requests as of now
            </Text>
          </View>
          <Button onPress={() => dispatch(getFeedbacks())}>Fetch Now</Button>
        </View>
      </>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <AppHeader />
      <View style={{ padding: moderateScale(15) }}>
        <FlatList
          data={feeds}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: moderateScale(100) }}
          refreshControl={
            <RefreshControl
              onRefresh={() => dispatch(getFeedbacks())}
              refreshing={getFeedbackLoading}
            />
          }
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={{
                  backgroundColor: "#eee",
                  padding: moderateScale(10),
                  marginBottom: moderateScale(15),
                }}
                key={item.id}
                onPress={() => updateExpanded(item.id)}
                activeOpacity={0.8}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    // marginBottom: moderateScale(10),
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "PoppinsMedium",
                      fontSize: moderateScale(17),
                      letterSpacing: 1.1,
                    }}
                  >
                    {item.name.split(" ")[0]}
                  </Text>

                  <Ionicons name="chevron-down" size={moderateScale(20)} />
                </View>
                {item.expanded && (
                  <View>
                    <Text
                      style={{
                        fontFamily: "PoppinsMedium",
                        marginTop: moderateScale(5),
                        fontSize: moderateScale(13),
                      }}
                    >
                      Comments: {item.comments}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "PoppinsMedium",
                        marginTop: moderateScale(5),
                        fontSize: moderateScale(13),
                      }}
                    >
                      Hostel name: {item.hostelName}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "PoppinsMedium",
                        marginTop: moderateScale(5),
                        fontSize: moderateScale(13),
                      }}
                    >
                      Meal type: {item.mealType}
                    </Text>
                    {
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "PoppinsMedium",
                            marginTop: moderateScale(5),
                            fontSize: moderateScale(13),
                          }}
                        >
                          Meal quality:
                        </Text>
                        <StarRating
                          rating={item.mealQuality}
                          onChange={() => {}}
                          enableSwiping={false}
                          starSize={20}
                          style={{ marginTop: 5 }}
                        />
                      </View>
                    }
                    {
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "PoppinsMedium",
                            marginTop: moderateScale(5),
                            fontSize: moderateScale(13),
                          }}
                        >
                          Service quality:
                        </Text>
                        <StarRating
                          rating={item.serviceQuality}
                          onChange={() => {}}
                          enableSwiping={false}
                          starSize={20}
                          style={{ marginTop: 5 }}
                        />
                      </View>
                    }
                    {
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "PoppinsMedium",
                            marginTop: moderateScale(5),
                            fontSize: moderateScale(13),
                          }}
                        >
                          Freshness of ingredients:
                        </Text>
                        <StarRating
                          rating={item.freshnessOfIngredients}
                          onChange={() => {}}
                          enableSwiping={false}
                          starSize={20}
                          style={{ marginTop: 5 }}
                        />
                      </View>
                    }
                    {
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "PoppinsMedium",
                            marginTop: moderateScale(5),
                            fontSize: moderateScale(13),
                          }}
                        >
                          Size of portion:
                        </Text>
                        <StarRating
                          rating={item.sizeOfPortions}
                          onChange={() => {}}
                          enableSwiping={false}
                          starSize={20}
                          style={{ marginTop: 5 }}
                        />
                      </View>
                    }
                    {
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "PoppinsMedium",
                            marginTop: moderateScale(5),
                            fontSize: moderateScale(13),
                          }}
                        >
                          Taste and Flavour:
                        </Text>
                        <StarRating
                          rating={item.tasteAndFlavour}
                          onChange={() => {}}
                          enableSwiping={false}
                          starSize={20}
                          style={{ marginTop: 5 }}
                        />
                      </View>
                    }
                    {
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "PoppinsMedium",
                            marginTop: moderateScale(5),
                            fontSize: moderateScale(13),
                          }}
                        >
                          Worth of meal over price:
                        </Text>
                        <StarRating
                          rating={item.worthOfMealOverPrice}
                          onChange={() => {}}
                          enableSwiping={false}
                          starSize={20}
                          style={{ marginTop: 5 }}
                        />
                      </View>
                    }
                    <Text
                      style={{
                        fontFamily: "PoppinsMedium",
                        marginTop: moderateScale(5),
                        fontSize: moderateScale(13),
                      }}
                    >
                      Student phone: {item.userPhone}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                      }}
                    ></View>
                  </View>
                )}
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};
