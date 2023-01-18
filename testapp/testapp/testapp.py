import pynecone as pc
import os
import random
class State(pc.State):

    count: int = 0
    format : str
    image : str 
    dir = 'C:/Users/SIK/VSCODE/test_pynecone/testapp/assets'
    def select_gif(self):
        self.format = '.gif'
        
        file_list = os.listdir(self.dir)
        gif_list = []
        for file in file_list:
            if '.gif' in file:
                gif_list.append(file)
        self.image = random.choice(gif_list)
       
        
    def select_other(self):
        self.format = 'other'
        file_list = os.listdir(self.dir)
        other_list = []
        for file in file_list:
            if '.gif' not in file:
                other_list.append(file)
        self.image = random.choice(other_list)


    
        


def index():
    return pc.vstack(
        pc.heading('dschoi Test!!', size="2xl",color='green',font_family='Silkscreen',font_size='3em'),
        pc.text(State.image,font_size='1.5em'),

        pc.text("i'm not a robot",font_family='Silkscreen',font_size='1.5em'),
        
        pc.button(
            "select_gif",
            color_scheme="red",
            border_radius="1em",
            on_click=State.select_gif,
        ),
        pc.button(
            "select_other",
            color_scheme="green",
            border_radius="1em",
            on_click=State.select_other,
        ),
        pc.image(src=State.image,width='500px',height='auto',border_radius='9px 9px', border ='5px solid #ff2500',box_shadow='lg'),
        
    )
app = pc.App(state=State,stylesheets=[
        "https://fonts.googleapis.com/css2?family=Silkscreen&display=swap",
    ],)
app.add_page(index)
app.compile()