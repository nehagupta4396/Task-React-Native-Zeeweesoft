import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {CatListArray} from '../components/actions/LoginAction';
import {Images} from '../Utils/Images';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export const ListScreen = ({navigation}) => {
  const dispatch = useDispatch();

  let catListResData = useSelector(state => state.CATLIStDATA);

  const [catMainList, setCatList] = useState([]);
  const [uiRender, setUiRender] = useState(false);

  //----- CatList res Useeffect called -----//
  useEffect(() => {
    console.log('catListResData', catListResData);
    if (catListResData != undefined && catListResData.length > 0) {
      catListResData.forEach((item, i) => {
        if (
          item.id == undefined ||
          item.id == null ||
          typeof item.id == 'undefined'
        ) {
          let maxId = Math.max.apply(
            null,
            catListResData.map(item => item.id),
          );
          if (typeof maxId == 'NaN' || isNaN(maxId)) {
            item.id = i + 1;
          } else {
            maxId = maxId + 1;
          }
        }
      });
      setCatList(catListResData);
    }
    console.log('catListResData', catListResData);
  }, [catListResData]);

  //----- This is header view code -----//
  const HeaderView = () => {
    return (
      <View style={styles.headerMainView}>
        <View style={styles.backView}>
          <TouchableOpacity>
            {/* <Image source={Images.goBackArrow} style={styles.backImage}/> */}
          </TouchableOpacity>
        </View>
        <View style={styles.titleMainView}>
          <Text style={styles.titleTextStyle}>Cat List</Text>
        </View>
        <View style={styles.backView}>
          <TouchableOpacity onPress={() => navigation.navigate('AddToDoTask')}>
            <Image source={Images.addIcon} style={styles.backImage} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  //----- This is delete function -----//
  const deleteItemFunc = getData => {
    const index = catMainList.indexOf(getData);
    catMainList.splice(index, 1);
    dispatch(CatListArray(catMainList));
    setUiRender(!uiRender);
  };

  return (
    <View style={styles.container}>
      {HeaderView()}
      <View>
        {catMainList && catMainList.length > 0 ? (
          <View>
            <FlatList
              data={catMainList}
              keyExtractor={item => item.id}
              renderItem={({item, index}) => (
                <View style={styles.ListMainTouchable}>
                  <View>
                    <View style={styles.nameDescMainView}>
                      <View style={styles.nameBreedMainViewe}>
                        <Text>{item.name}</Text>
                        <Text style={styles.breedTextStyle}>{item.breed}</Text>
                      </View>
                      <Text style={styles.descTextStyle}>
                        {item.description}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.editDeleteView}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('EditDetail', {
                          editData: item,
                          editIndex: index,
                        })
                      }>
                      <Image
                        source={Images.editIcon}
                        style={styles.editDeleteImageStyle}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteItemFunc(item)}>
                      <Image
                        source={Images.deleteIcon}
                        style={[styles.editDeleteImageStyle, {marginLeft: 15}]}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>
        ) : (
          <Text>hsdhjsh</Text>
        )}
      </View>
    </View>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerMainView: {
    height: 55,
    width: width,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderColor: 'lightgrey',
  },
  backView: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backImage: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  titleMainView: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTextStyle: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
  ListMainTouchable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderColor: '#000',
    borderBottomWidth: 0.5,
  },
  nameDescMainView: {
    justifyContent: 'center',
    marginLeft: 10,
  },
  nameBreedMainViewe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  breedTextStyle: {
    color: 'lightgrey',
    fontSize: 11,
    marginLeft: 10,
  },
  descTextStyle: {
    color: 'grey',
    fontSize: 12,
    width: width / 2 + 85,
  },
  editDeleteView: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  editDeleteImageStyle: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
});
