import unittest
import time
from selenium import webdriver

class GlimpseTest(unittest.TestCase):
    def script(self, script):
        return self.driver.execute_script(script)

    def is_available(self, tag):
        try:
            self.driver.find_element_by_tag_name(tag)
            return True
        except:
            time.sleep(.25)
            return False

    def find(self, tag):
        while True:
            if self.is_available(tag):
                return self.driver.find_element_by_tag_name(tag)
                break

    @classmethod
    def setUpClass(self):
        self.driver = webdriver.Chrome()
        self.driver.get('http://localhost:8000')

    @classmethod
    def tearDownClass(self):
        self.driver.quit()

    def test_title(self):
        self.assertEqual(self.driver.title, 'Test Server')
        self.assertEqual(self.find('h1').text, "Python Server")

    def test_glimpse_create_image(self):
        self.script('start()')
        img = self.script('return img')
        met = self.script('return met')
        self.assertEqual(met['width'], 614)
        self.assertEqual(met['height'], 409)
        self.assertEqual(img[:10], '#a2927c614')

    def test_glimpse_base64(self):
        self.script('start()')
        self.script('glimpse.base64(img, base64callback)')
        img = self.script('return b64res')
        met = self.script('return b64met')
        self.assertEqual(met['width'], '614')
        self.assertEqual(met['height'], '409')
        self.assertEqual(img[:30], 'data:image/jpeg;base64,/9j/4AA')

    def test_glimpse_image(self):
        '''The object returned as ires cannot be tested using selenium
        When examined in Chrome tools there is an object of type img
        with the correct width and height. '''
        self.script('start()')
        self.script('glimpse.image(img, imagecallback)')
        img = self.script('return ires')
        self.assertTrue(img)
        met = self.script('return imet')
        self.assertEqual(met['width'], '614')
        self.assertEqual(met['height'], '409')

    def test_glimpse_canvas(self):
        '''The object returned as cres cannot be tested using selenium
        When examined in Chrome tools there is an object of type canvas
        with the correct width and height. '''
        self.script('start()')
        self.script('glimpse.canvas(img, canvascallback)')
        img = self.script('return cres')
        self.assertTrue(img)
        met = self.script('return cmet')
        self.assertEqual(met['width'], '614')
        self.assertEqual(met['height'], '409')

    def test_glimpse_meta(self):
        self.script('start()')
        met = self.script('return glimpse.meta(img)')
        self.assertEqual(met['width'], '614')
        self.assertEqual(met['height'], '409')

if __name__ == '__main__':
    unittest.main()
