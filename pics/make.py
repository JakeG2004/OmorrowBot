from PIL import Image, ImageDraw, ImageFont
img = Image.open("skelly.jpg")
draw = ImageDraw.Draw(img)

fontsize = 65
font = ImageFont.truetype("impact.ttf", fontsize)

for x in range(31):
    img = Image.open("skelly.jpg")
    draw = ImageDraw.Draw(img)
    txt = 'It\'s Boner Day {}'.format(x+1)
    draw.text((20, 350), txt, font = font, fill = (255, 255, 255), stroke_width=7, stroke_fill=(0, 0, 0))
    img.save('output{}.jpg'.format(x+1))
    img.close()
