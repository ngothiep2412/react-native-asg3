import { FlashList } from "@shopify/flash-list";

import OrchidItem from "./OrchidItem";

function renderOrchidItem(itemData) {
  return <OrchidItem {...itemData.item}></OrchidItem>;
}

function OrchidList({ orchids }) {
  return (
    <FlashList
      data={orchids}
      renderItem={renderOrchidItem}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 50,
      }}
      estimatedItemSize={30}
      numColumns={2}
    />
  );
}

export default OrchidList;
