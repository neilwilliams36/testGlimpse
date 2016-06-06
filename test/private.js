var expect = require('chai').expect;
var glimpse = require('../glimpse');

//Ensure glimpse is exported and private functions
//are exposed at 56
/*
return {
  create: encodeImage,
  base64: imageToBase64,
  canvas: imageToCanvas,
  image: imageToImg,
  meta: getImageMeta,
  get support(){ return !!getContext(createImage(tagCanvas)) },
  limit: limit,
  hexIndex: hexIndex,
  keyIndex: keyIndex,
  map: map,
  resize: resize,
  channelToKey: channelToKey,
  keyToChannel: keyToChannel,
  getAverageColor: getAverageColor,
  channelToHex: channelToHex,
  hexToMonochrome: hexToMonochrome

};
*/


describe("Glimpse-Js functions:", function(){
  
  it('returns the correct hexToMonochrome', function(){
    expect(glimpse.hexToMonochrome('000000')).to.equal('000000');
    expect(glimpse.hexToMonochrome('FFFFFF')).to.equal('ffffff');
    expect(glimpse.hexToMonochrome('6666ff')).to.equal('999999');//blue
    expect(glimpse.hexToMonochrome('ff0000')).to.equal('555555');//yellow
    expect(glimpse.hexToMonochrome('5cd65c')).to.equal('858585');//green

  });
  it('returns the correct channelToHex', function(){
    expect(glimpse.channelToHex(0)).to.equal('00');
    expect(glimpse.channelToHex(5)).to.equal('05');
    expect(glimpse.channelToHex(11)).to.equal('0b');
    expect(glimpse.channelToHex(255)).to.equal('ff');
    expect(glimpse.channelToHex(134)).to.equal('86');
    expect(glimpse.channelToHex(2344)).to.equal('928');
  });

  it('returns the correct getAverageColor', function(){
    expect(glimpse.getAverageColor([0,0,0],1)).to.equal('000000');
    expect(glimpse.getAverageColor([0,0,0],50)).to.equal('000000');
    expect(glimpse.getAverageColor([0,0,0],100)).to.equal('000000');

    expect(glimpse.getAverageColor([100,100,100],1)).to.equal('646464');
    expect(glimpse.getAverageColor([100,100,100],50)).to.equal('020202');
    expect(glimpse.getAverageColor([100,100,100],100)).to.equal('010101');

    expect(glimpse.getAverageColor([1000,2000,3000],1)).to.equal('3e87d0bb8');
    expect(glimpse.getAverageColor([1000,2000,3000],50)).to.equal('14283c');
    expect(glimpse.getAverageColor([1000,2000,3000],100)).to.equal('0a141e');
  });

  it('returns the correct keyToChannel', function(){
    expect(glimpse.keyToChannel('00')[0]).to.equal(0);
    expect(glimpse.keyToChannel('00')[1]).to.equal(0);
    expect(glimpse.keyToChannel('00')[2]).to.equal(0);

    expect(glimpse.keyToChannel('FF')[0]).to.equal(51);
    expect(glimpse.keyToChannel('FF')[1]).to.equal(204);
    expect(glimpse.keyToChannel('FF')[2]).to.equal(255);

    expect(glimpse.keyToChannel('33')[0]).to.equal(0);
    expect(glimpse.keyToChannel('33')[1]).to.equal(204);
    expect(glimpse.keyToChannel('33')[2]).to.equal(51);

    expect(glimpse.keyToChannel('A3')[0]).to.equal(34);
    expect(glimpse.keyToChannel('A3')[1]).to.equal(136);
    expect(glimpse.keyToChannel('A3')[2]).to.equal(51);
  });

  it('returns the correct channelToKey value', function(){
    expect(glimpse.channelToKey(0,0,0)).to.equal('00');
    expect(glimpse.channelToKey(255,255,255)).to.equal('//');
    expect(glimpse.channelToKey(100,100,100)).to.equal('Pc');
    expect(glimpse.channelToKey(200,200,200)).to.equal('pC');
    expect(glimpse.channelToKey(100,50,200)).to.equal('Oy');
  });

  it('resize produces the correct map of {width,height} if quality is false', function(){
    expect(glimpse.resize(100,100, false)['width']).to.equal(100);
    expect(glimpse.resize(100,100, false)['height']).to.equal(100);
    expect(glimpse.resize(50,200, false)['width']).to.equal(50);
    expect(glimpse.resize(50,200, false)['height']).to.equal(200);
  });

  it('resizes produces the correct map of {width,height} if quality is positive', function(){

      expect(glimpse.resize(50,50, 1)['width']).to.equal(6);
      expect(glimpse.resize(50,50, 1)['height']).to.equal(6);
      expect(glimpse.resize(50,50, 25)['width']).to.equal(6);
      expect(glimpse.resize(50,50, 25)['height']).to.equal(6);
      expect(glimpse.resize(50,50, 50)['width']).to.equal(6);
      expect(glimpse.resize(50,50, 50)['height']).to.equal(6);
      expect(glimpse.resize(50,50, 75)['width']).to.equal(6);
      expect(glimpse.resize(50,50, 75)['height']).to.equal(6);
      expect(glimpse.resize(50,50, 100)['width']).to.equal(6);
      expect(glimpse.resize(50,50, 100)['height']).to.equal(6);
      expect(glimpse.resize(50,50, 125)['width']).to.equal(6);
      expect(glimpse.resize(50,50, 125)['height']).to.equal(6);

      expect(glimpse.resize(150,150, 1)['width']).to.equal(6);
      expect(glimpse.resize(150,150, 1)['height']).to.equal(6);
      expect(glimpse.resize(150,150, 25)['width']).to.equal(6);
      expect(glimpse.resize(150,150, 25)['height']).to.equal(6);
      expect(glimpse.resize(150,150, 50)['width']).to.equal(6);
      expect(glimpse.resize(150,150, 50)['height']).to.equal(6);
      expect(glimpse.resize(150,150, 75)['width']).to.equal(8);
      expect(glimpse.resize(150,150, 75)['height']).to.equal(8);
      expect(glimpse.resize(150,150, 100)['width']).to.equal(10);
      expect(glimpse.resize(150,150, 100)['height']).to.equal(10);
      expect(glimpse.resize(150,150, 125)['width']).to.equal(10);
      expect(glimpse.resize(150,150, 125)['height']).to.equal(10);

      expect(glimpse.resize(300,300, 1)['width']).to.equal(6);
      expect(glimpse.resize(300,300, 1)['height']).to.equal(6);
      expect(glimpse.resize(300,300, 25)['width']).to.equal(6);
      expect(glimpse.resize(300,300, 25)['height']).to.equal(6);
      expect(glimpse.resize(300,300, 50)['width']).to.equal(10);
      expect(glimpse.resize(300,300, 50)['height']).to.equal(10);
      expect(glimpse.resize(300,300, 75)['width']).to.equal(15);
      expect(glimpse.resize(300,300, 75)['height']).to.equal(15);
      expect(glimpse.resize(300,300, 100)['width']).to.equal(20);
      expect(glimpse.resize(300,300, 100)['height']).to.equal(20);
      expect(glimpse.resize(300,300, 125)['width']).to.equal(20);
      expect(glimpse.resize(300,300, 125)['height']).to.equal(20);
  });

  it('constants hexIndex, keyIndex and map always have same values', function(){
    expect(glimpse.hexIndex[0]).to.equal('000');
    expect(glimpse.hexIndex[4095]).to.equal('FFF');
    expect(glimpse.hexIndex[1111]).to.equal('457');
    expect(glimpse.hexIndex[2222]).to.equal('8AE');
    expect(glimpse.hexIndex[3333]).to.equal('D05');

    expect(glimpse.keyIndex[0]).to.equal('00');
    expect(glimpse.keyIndex[4095]).to.equal('//');
    expect(glimpse.keyIndex[1111]).to.equal('HN');
    expect(glimpse.keyIndex[2222]).to.equal('Yk');
    expect(glimpse.keyIndex[3333]).to.equal('q5');

    expect(glimpse.map['hex']['100']).to.equal('40');
    expect(glimpse.map['hex']['8AE']).to.equal('Yk');
    expect(glimpse.map['hex']['457']).to.equal('HN');
    expect(glimpse.map['hex']['D05']).to.equal('q5');
    expect(glimpse.map['hex']['FFF']).to.equal('//');

    expect(glimpse.map['key']['10']).to.equal('040');
    expect(glimpse.map['key']['//']).to.equal('FFF');
    expect(glimpse.map['key']['Yk']).to.equal('8AE');
    expect(glimpse.map['key']['HN']).to.equal('457');
    expect(glimpse.map['key']['q5']).to.equal('D05');
  });



  it('limit works with positive integers', function(){
    expect(glimpse.limit(0,0,0)).to.equal(0);

    expect(glimpse.limit(10,1,5)).to.equal(5);
    expect(glimpse.limit(10,5,1)).to.equal(1);

    expect(glimpse.limit(1,5,10)).to.equal(5);
    expect(glimpse.limit(1,10,5)).to.equal(10);

    expect(glimpse.limit(5,1,10)).to.equal(5);
    expect(glimpse.limit(5,10,1)).to.equal(10);
  });
});
