import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native';
import LogInComponent from './src/components/LogInComponent';
import LoaderComponent from './src/components/LoaderComponent';
import ColorGrid from './src/components/ColorGrid';
import InfiniteScroll from './src/components/InfiniteScroll';
import Customers from './src/components/RobinAi/Customers';

export default function App() {
  return (
    <ScrollView>
      <View style={styles.screen}>
        {/* <LogInComponent /> */}
        {/* <LoaderComponent /> */}
        {/* <ColorGrid /> */}
        {/* <InfiniteScroll /> */}
        <Customers />
      </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
});