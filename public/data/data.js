// Data source: https://open.toronto.ca/dataset/street-tree-data/

// type RawTree = [string, number, number];

// type Tree = {
//   key: string;
//   name: string;
//   lat: number;
//   lng: number;
// };

const trees = [

  ["Spruce, Norway", 46.8478, 9.5235],
  ["Fir, Douglas", 46.8553, 9.5366],
  ["Pine, Scots", 46.8569, 9.5243],
  ["Willow, weeping", 46.8605, 9.5342],
  ["Oak, English", 46.8521, 9.5208],
  ["Cherry, sweet", 46.8536, 9.5264],
  ["Walnut, black", 46.8548, 9.5320],
  ["Linden, American", 46.8510, 9.5185],
  ["Holly, English", 46.8462, 9.5294],
  ["Cottonwood, Eastern", 46.8499, 9.5276],
  ["Sycamore, London plane", 46.8503, 9.5212],
  ["Beech, European", 46.8556, 9.5228],
  ["Hickory, Shagbark", 46.8601, 9.5261],
  ["Horse Chestnut", 46.8574, 9.5289],
  ["Tulip Tree", 46.8465, 9.5323],
  ["Redwood, Coast", 46.8541, 9.5270],
  ["Sequoia", 46.8589, 9.5225],
  ["Chestnut, American", 46.8491, 9.5239],
  ["Juniper, Common", 46.8563, 9.5352],
  ["Cedar, Atlas", 46.8578, 9.5293],
  ["Douglas Fir", 46.8603, 9.5246],
  ["Ponderosa Pine", 46.8559, 9.5311],
  ["Silver Birch", 46.8545, 9.5330],
  ["Black Locust", 46.8463, 9.5204],
  ["European Hornbeam", 46.8492, 9.5257],
  ["Hornbeam, American", 46.8608, 9.5314],
  ["Alder, Red", 46.8539, 9.5302],
  ["Larch, European", 46.8549, 9.5236],
  ["Pine, White", 46.8527, 9.5265],
  ["Fir, Balsam", 46.8504, 9.5351],
  ["Cypress, Mediterranean", 46.8557, 9.5288],
  ["Yew, English", 46.8468, 9.5197],
  ["Willow, Black", 46.8534, 9.5335],
  ["Mountain Ash", 46.8587, 9.5200],
  ["Tree of Heaven", 46.8606, 9.5267],
  ["Japanese Maple", 46.8502, 9.5349],
  ["Wellingtonia", 46.8467, 9.5216],
  ["Magnolia, Southern", 46.8552, 9.5223],
  ["Whitebeam", 46.8476, 9.5299],
  ["Serviceberry", 46.8602, 9.5300],
  ["Yew, Japanese", 46.8526, 9.5274],
  ["Ginkgo", 46.8547, 9.5255],
  ["American Elm", 46.8554, 9.5337],
  ["Red Oak", 46.8481, 9.5304],
  ["Green Ash", 46.8573, 9.5269],
  ["Sweetgum", 46.8464, 9.5221],
  ["Kentucky Coffeetree", 46.8530, 9.5248],
  ["American Holly", 46.8558, 9.5218],
  ["Black Walnut", 46.8609, 9.5359],
  ["Katsura", 46.8475, 9.5275],
  ["Holly Oak", 46.8524, 9.5203],
  ["European Beech", 46.8560, 9.5286],
  ["Scarlet Oak", 46.8601, 9.5227],
  ["Honey Locust", 46.8593, 9.5317],
  ["Bald Cypress", 46.8496, 9.5306],
  ["Weeping Willow", 46.8518, 9.5247],
  ["Paper Birch", 46.8535, 9.5226],
  ["Alder, Grey", 46.8579, 9.5291],
  ["Indian Bean Tree", 46.8461, 9.5358],
  ["Pine, Red", 46.8583, 9.5232],
  ["Black Cherry", 46.8509, 9.5241],
  ["Crabapple", 46.8544, 9.5284],
  ["Pawpaw", 46.8607, 9.5334],
  ["Quince", 46.8466, 9.5271],
  ["Pomegranate", 46.8525, 9.5303],
  ["Oleander", 46.8550, 9.5341],
  ["American Basswood", 46.8537, 9.5267],
  ["European Ash", 46.8494, 9.5298],
  ["Black Locust", 46.8604, 9.5259],
  ["Buckeye", 46.8565, 9.5327],
  ["Pine, Austrian", 46.8571, 9.5313],
  ["Sweet Cherry", 46.8469, 9.5206],
  ["Pawpaw", 46.8602, 9.5335],
  ["Pistachio", 46.8543, 9.5256],
  ["Mango", 46.8561, 9.5233],
  ["Olive", 46.8594, 9.5278],
  ["Date Palm", 46.8487, 9.5229],
  ["Cedar, Red", 46.8551, 9.5287],
  ["Ailanthus", 46.8533, 9.5331],
  ["Maple, Silver", 46.8505, 9.5240],
  ["Linden, European", 46.8546, 9.5273],
  ["European Hornbeam", 46.8588, 9.5292],
  ["Hornbeam, American", 46.8520, 9.5268],
  ["Witch Hazel", 46.8555, 9.5307],
  ["Black Pine", 46.8460, 9.5272],
  ["Yew, Pacific", 46.8600, 9.5325],
  ["Cypress, Arizona", 46.8577, 9.5245],
  ["Birch, Paper", 46.8497, 9.5357],
  ["Elm, Siberian", 46.8559, 9.5220],
  ["Silver Maple", 46.8473, 9.5308],
  ["Alder, Black", 46.8603, 9.5262]
];



const formatted = trees.map(([name, lat, lng]) => ({
  name,
  lat,
  lng,
  key: JSON.stringify({ name, lat, lng }),
}));
const newData = [["Aspen, quaking", 46.8582, 9.5281],
["Birch, silver", 46.8452, 9.5131],
["Maple, Norway", 46.8602, 9.5371],
["Elm, American", 46.8508, 9.5285],]
export const data2 = newData.map(([name, lat, lng]) => ({
  name,
  lat,
  lng,
  key: JSON.stringify({ name, lat, lng }),
}));

export default formatted;