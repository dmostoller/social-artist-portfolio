#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
import datetime 
# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Comment, Painting, Event, Post

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Clearing tables...")
        User.query.delete()
        Comment.query.delete()
        Painting.query.delete()
        Event.query.delete()
        Post.query.delete()

        print("Seeding users...")
        users = [
            User(username="Kaba", name="Dave Mostoller", email="dmostoller@gmail.com", password_hash="bass", is_admin=True),
            User(username="Yasi", name="Yasmin Mostoller", email="yasmin.nunsy@gmail.com", password_hash="lily", is_admin=True)
        ]

        db.session.add_all(users)

        print("Seeding paintings")
        paintings = [
            Painting(title="Infinity Prolonged", 
                     materials="Mixed Media on Canvas", 
                     width=62, 
                     height=77, 
                     price="contact for price", 
                     fullsize="https://previews.dropbox.com/p/thumb/ACI_OAB3H9fI9yEUP9m-KMGgXQ_2Nrg09s6A9cWvXRaHAymcWC9R5j_XK8TigpJnkLZzI6f5RDg9oFaylA0nZ24Q-k3y4HjhooAm9GMyyzohf7nYPabD52RiM5o_nUMj9E0mguZH_AheH6Nm7VbE9eqEim5DGa013o5-YLA0UH-tgBMjSrjjcwsiHWMJMY1vHN65cl-oWsGI7BzeU35pNbXFi9iVmPt_8qE6ZSL8C_f7e7-VXbmULuNAZUZYgpuauZvC0n_M26lfP14PUIofQGpWLfaQ8bB6AgCEGOuFoXznZZtGhkznrVihTjEtrPPnw7P4ILBKvzAZGrxUzP84-qkZiBXWhBSe1f_F0PA2JrR4IZ1aaB55hPK9q8NKAiYlwTRGM_skceN1VeFkaK3vy3Bhr7XGxpQzKggTbPTVZvn6bOI3wbxB_Lp9101XoEO3AcKAtSQrCDeXeM1hLEnBuUk1b3OUuXe67-4WUER3S08enEr0pKc40d3lIWqjVQuHHkR5NZPu3zLPVABNBfaSFxOu/p.jpeg", 
                     image="https://static.wixstatic.com/media/1d469b_1f2db3f1efae41e692e98fcef5e11e0d~mv2.jpg/v1/fill/w_365,h_440,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Series%20A-43.jpg", 
                     sold=False),
            Painting(title="Nirvana", 
                     materials="Mixed Media on Canvas", 
                     width=62, 
                     height=78, 
                     price="contact for price", 
                     fullsize="https://previews.dropbox.com/p/thumb/ACILxaj-IL-x5VPUUdV6wJXYm_WGWx7xnXLfGifIZz28Xe3m0Ip3jMkOinoXY0v8G3FvhRkGxCeuUmbnHnRiE7pApj9RL1x8kLPQ5gQIlZmmLFbnq5dd09teCzTxhfSIu1C0GTeUVj0dfGCMrOVuMMYiRvi9yqikKjEtl-Ubzffk0S1YuTDy03AyxA-hvKdC2xGH91V21sOPNFhPlDdZeACGtpoFzPBgR4x5I06DUaNDO3XIiKAowcB1q0yFCiHB_I2vtLEb2KMcElCKxC3rR8iN-bDOurUzZWqZE4gsdr3Lb9CTZlls53NeDBttnE5-Qt2fOnIKxyIHZYTptVUF1LdwfZNtjcEnbPGegrXQNeYeOv1TDpDv4emloAEN38mr-jHx8OGP1unpeaNoA1HXOg8UMQzGbBm-nnMbH9zfG2eoHtRtt_gYCSU_h1ioU6jKPAErJKrL1E-SQ-YklNqPc71odzekQnKTGoBDtGo8JfobBV8scOJlYfdVYtSqLkag1M8V95qJpDXChGD-HWhItSMh/p.jpeg", 
                     image="https://static.wixstatic.com/media/1d469b_fad375d839b643c98c5e2955a65a1414~mv2.jpg/v1/fill/w_344,h_440,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Series%20A-42.jpg", 
                     sold=False),
            Painting(title="Samsara", 
                     materials="Mixed Media on Canvas", 
                     width=62, 
                     height=77, 
                     price="contact for price", 
                     fullsize="https://previews.dropbox.com/p/thumb/ACIco2YJZiZrKPLOx8ebnEOIQ2sSxuwAhwvyuIjQN7Vo64jdeXo9AzjqqLk19SY86t8aFoUzqdbXWAwDKkQclHZ4hIIf0Ymsuo7sBVmFE-Af89qdOHzel634gwTmvoFgzhhPZi9WX2jbIfKO5LN16PWEXWmo9CdkSX3VAw2RZ2uZKV_hNjdGIt3SbXGODGkWnATmzgaPB9b3zg_UTbqL7uPoysuhEXVQ5ReoYUoaBCjTIw0LdO9OMz0cjovKhyGjljJybBPhwvx1pIO3n8b2LGRE5y6jAuiAdxvNu05QM-o0TnMKgpac_zqn8KxfvOTgVM6qQ9nEXa_oT5CmR0M02-NvSsMgyTklVH6j-pPe1IeqxQBD0uy7eidjlLbO5wJpTsjrsc8_GB3DQkZPFYvts5PnlPB7gD8l21CcT-DI0l3os0NS0xiqguBW7sXaCVFNxsbeRHkALM0uqReMi9ddq0N7MgpaHMRwhvsuz-QiEDSXH-UxWmpR5wWwFlr5HrjtpaJjoyM6m0TrGsKH7H41PmY06klv2mc0CxaduAkum-vOp6d7RpJkdveSKn0ufWe9xe8/p.jpeg", 
                     image="https://static.wixstatic.com/media/1d469b_2ed238bf0e47489f83c3063229952328~mv2.jpg/v1/fill/w_370,h_440,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Untitled%2062x77_edited.jpg", 
                     sold=False),
            Painting(title="Untitled", 
                     materials="Mixed Media on Canvas", 
                     width=48, 
                     height=52, 
                     price="contact for price", 
                     fullsize="https://previews.dropbox.com/p/thumb/ACLoEyOE5EgBDb2Bl5lcGHzdn0TNriCg-2EQcF3a0Bga5Mm5oPkSpa-8z7NBk62Ct6heGca09Hz2CMngrvguVBOi9wi_pVGwxX45nhrWObttWKJsF-9ZVHxg2Q1qE_pLZ1lO78CCejT_mJwB6xgHyd7Fjf7XbZogeGHD-Fo2nUmeNIuIRWuu4Ol0zcsR1y2vZshsPwXHq6upsB_BIDV1oAnIpK2IinXyCBk2-h5RUfxP7ZKrskJ8iP8avvU_1HxPSekkQlj31sb0kSkRdDBiXM_Pyef0uD33AyewwD9WfYqE4xUPUrMHnxXQ69KiTXWu5D2eBRjywymE6jTjoMGejxur/p.jpeg", 
                     image="https://previews.dropbox.com/p/thumb/ACLoEyOE5EgBDb2Bl5lcGHzdn0TNriCg-2EQcF3a0Bga5Mm5oPkSpa-8z7NBk62Ct6heGca09Hz2CMngrvguVBOi9wi_pVGwxX45nhrWObttWKJsF-9ZVHxg2Q1qE_pLZ1lO78CCejT_mJwB6xgHyd7Fjf7XbZogeGHD-Fo2nUmeNIuIRWuu4Ol0zcsR1y2vZshsPwXHq6upsB_BIDV1oAnIpK2IinXyCBk2-h5RUfxP7ZKrskJ8iP8avvU_1HxPSekkQlj31sb0kSkRdDBiXM_Pyef0uD33AyewwD9WfYqE4xUPUrMHnxXQ69KiTXWu5D2eBRjywymE6jTjoMGejxur/p.jpeg", 
                     sold=True),
            Painting(title="Guided by Gaudi", 
                     materials="Mixed Media on Canvas", 
                     width=24, 
                     height=48, 
                     price="contact for price", 
                     fullsize="https://previews.dropbox.com/p/thumb/ACLU-aeTNkQEnhmBQS1Jp9ED4miATj40lGgUgJ7Z3Y03UORUWv4GybU56SYzzjrlrwTN9T7tdG0Oq28J-b3eKhciGYAvUA1pTL8rb5RrNBrWaVFUr-384n-ro_ewCA_Lubip5ACD5-fNpdbXPdplAXVwg2aCN3z_a7SFsRprNx9UoIgqPKOwAF_LLU1vahOo4HvL_WVicGUOdBPARwJhuaCGkuAoI6ByEvo0CEWjTCns33YhOXoOJcQtoFowZIN6AB1JKkdKABQLOsQSIOE9JS-igLpkynRzLsJEu0mOcodZ1VsJSVo8RxdfQh5suPEB-r4cyGqnNOTVSXbH758VeILMgafqgrejiQ4g_P2waeD0abPZKc370ZwzsA-vZZ5kZVsToExICZ6h4wGYLZcrMSaHpNBoy0BdMQUXL7JzlrBsoUKLNpVKmC4cD_uCNobFZATs7poEGg17KAnBQes3j5RkCrTV6SRy3Qptw_VUw89s4djRjLTGgimaD61_2XFtivD4qUGnptv_D5FUBjPc__hA/p.jpeg", 
                     image="https://static.wixstatic.com/media/1d469b_546882f81c334a8f8c75cc1a40981cf9~mv2.jpg/v1/fill/w_217,h_440,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Series%20A-46.jpg", 
                     sold=True),
            Painting(title="Galaxy 1", 
                     materials="Mixed Media on Canvas", 
                     width=30, 
                     height=48, 
                     price="contact for price", 
                     fullsize="https://previews.dropbox.com/p/thumb/ACLU-aeTNkQEnhmBQS1Jp9ED4miATj40lGgUgJ7Z3Y03UORUWv4GybU56SYzzjrlrwTN9T7tdG0Oq28J-b3eKhciGYAvUA1pTL8rb5RrNBrWaVFUr-384n-ro_ewCA_Lubip5ACD5-fNpdbXPdplAXVwg2aCN3z_a7SFsRprNx9UoIgqPKOwAF_LLU1vahOo4HvL_WVicGUOdBPARwJhuaCGkuAoI6ByEvo0CEWjTCns33YhOXoOJcQtoFowZIN6AB1JKkdKABQLOsQSIOE9JS-igLpkynRzLsJEu0mOcodZ1VsJSVo8RxdfQh5suPEB-r4cyGqnNOTVSXbH758VeILMgafqgrejiQ4g_P2waeD0abPZKc370ZwzsA-vZZ5kZVsToExICZ6h4wGYLZcrMSaHpNBoy0BdMQUXL7JzlrBsoUKLNpVKmC4cD_uCNobFZATs7poEGg17KAnBQes3j5RkCrTV6SRy3Qptw_VUw89s4djRjLTGgimaD61_2XFtivD4qUGnptv_D5FUBjPc__hA/p.jpeg", 
                     image="https://static.wixstatic.com/media/1d469b_0d86638c0dfd4e2899f67af022647612~mv2.jpg/v1/fill/w_272,h_440,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Series%20A-26.jpg", 
                     sold=False),
            Painting(title="Abstract Ape", 
                     materials="Mixed Media on Canvas", 
                     width=24, 
                     height=24, 
                     price="contact for price", 
                     fullsize="https://previews.dropbox.com/p/thumb/ACIYsDJIcw-qHvxhvZZD1Jl5c8EbP287KKC3lTk8swXVwt9WNWYIO2asKCTBAoJfN_gBMbTV1JAo0Q8WWWRtu7aBtYsUt2SV8s-lpRHvWFF0n3ANHC-AK5O1Mj-C-qVTBpFe9_ZXYjTjNrvjJcNajgdk9UQtoYJSW9MhFCl_uKicp5M-b5cSSwIlJuyfV_NdUnbi7ByhQWAdOQTK7uCjbXoMppi1z0c17O11g2Wv-0r2LvNTB0OiChkJkY7DhG_y7zgqygtQd3dw9HHeCwOC9k6s4x2TK8a63vFt9NJU9kDQQzvDYWSNa3elzoCTc0nFwtC2hi5dhA9uXq2IZDPMxfvFEmu_2QFr5EWXfiuBqze9YTvuMKb3cJHkgVLhMRDhzeDeODKXM0MUBlvbNlCvJcqmTqVMRBLk6lwp-PuoFKJqcFOlmGu96BRocvFmwFWOs2rA-lgYYbpYW7IeQ6BI1gKiG4xyixU7KXCVEWcKvyicDdcd2O6_IHNlZl5XLUOFm4PCj57fxAqlbit1EmiFt5_EBQXnXnY7NV0mAQfIMPX7rgp7o6v2CzKir54KAcMoPQhpswjRKr6Rjj-rJsOWotBq/p.jpeg", 
                     image="https://static.wixstatic.com/media/1d469b_d05e2d8f44a94ad58f184d785195f808~mv2.jpg/v1/fill/w_438,h_440,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Series%20A-47.jpg", 
                     sold=True),
            Painting(title="Nebulae", 
                     materials="Mixed Media on Canvas", 
                     width=30, 
                     height=48, 
                     price="contact for price", 
                     fullsize="https://previews.dropbox.com/p/thumb/ACIW0lTeamaBd2KwX-knL3YFlvf1N89T73_10gjWCZT4fg3ag1_LqhSkAS0AeSdNi23EfQQNfRrmw5qUCA7AcZjCxNEZx2XU1LQ98h5x49Vr5TKYO1IDKM3jbjATzzzk_plPavbxTeTPcGDrSvErEB2aHZCx75lw18G2xpjxMfIfZTRInGvH2IDCP50dCJp4VqMTFS31jis01SOi_hD64XiNlZo-IUPaYQeiUkw1olBszuCUmLcGfJGTgAo3mtWdFFwkcO3sNtEI78_5YRqMt8lvL4XsCkA9Y4yMxagvClbOw9fFZa8H7nmWdXvyBKj-MXJojuweauKPRDvBk3RbQ6aQMVbATBTu7wPwVzZMPkZZEu5mJ2rRLnWBPSeMoevJ-pOat4EdQLdNYB0w42NUqerr/p.jpeg", 
                     image="https://static.wixstatic.com/media/1d469b_2f5da1d2760f4a8f865c01bb9ccf2656~mv2.jpg/v1/fill/w_272,h_440,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Series%20A-36.jpg", 
                     sold=False),
            Painting(title="Ancestral Spirit", 
                     materials="Mixed Media on Canvas", 
                     width=22, 
                     height=28, 
                     price="contact for price", 
                     fullsize="https://previews.dropbox.com/p/thumb/ACLXIYL6CG7VcUXaKzOyfsC3hrDPQzB_NwEvPQRinFSE-G2FdaJp_bbDvK4gsD1yX3TD3HmpEKnHDRzNCj85q8FL4NFFZ8yJwVpv3uK9N9_hYaP11cBcBmzJwo_qM3tECeasg4W9DoOeJq0_dnmExuC3bRTdhg9aOoZXSBfyZZpZadyr0GTGM5n8MSa4fbG4e8QqvWLHlRyDJsl6yXk7LXmfrZSEnNNsntv3JyYxaR_2yRfw1iMmyVygzvRXuzcfdwVflIDGh6jyN521dTAuITOorjO7fzj10biB91NJF_OtOdtopHDo741EcZ6wvTJL_p0C9AaohtkYzDRpqqyzdNHtDrXSAthzxYdEpAz4CrbQPo4JxWKoaO8FxgfyzReHdZlrxctut0GheH7G2tzkLe_Y/p.jpeg", 
                     image="https://static.wixstatic.com/media/1d469b_8d65293fb2944084ab5dfb0ac171535a~mv2.jpg/v1/fill/w_342,h_440,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Series%20A-31.jpg", 
                     sold=False),
            Painting(title="Blue Dream", 
                     materials="Mixed Media on Canvas", 
                     width=36, 
                     height=36, 
                     price="contact for price", 
                     fullsize="https://previews.dropbox.com/p/thumb/ACLFpar6Bnp7QQMDkmpDNMuar4i75MY9y2FjsTfhxjr53a3RGZvKdJ-e1Mfi9bEZf2iHcC7r2R0l0C1eySmCqXMxPby8x3ypmBOgNVMnYMEz27JMUTjLlllEM4vj8KwvManh2MSLj7n4MID_rwL482WnK-kVDtLR2GCVuW-dDaUggdiJndPwaGH_6a1Ojr2FN6qHIGirOKr4E-zzPNnD7mREHaY7yu66Ft1bO0H5eGuoGUtLkqbxmGF2DHlmHScnx-_mlR4AlOhPrC7-OpvWbVxKT4F4MqjfPgN8I4ku2FlZE_Pl29ds7qjYRXpmrV9eZd82ujeEk0rB9R6oWrLwIVGVNXsSA5DP7HA0qlSAN62qhTlbrkpKac-4pzlvDvLR23Z6Nmq5LdOP2jt0XP05tT344TZbQExya_x3iOMiiK1DJGiP4vcEQLjSKswTrxwH2bngy7GH0fSpp-KZUn5nSPi_N4Xn9mt8Oqjm4lVMHKGK8nJnLj_dM-3mQ2lQBtbbpeNkmxcgurgFZ4CzOM8kj6Qz/p.jpeg", 
                     image="https://static.wixstatic.com/media/1d469b_14e0512e00d0477eb829f9a824dbaa46~mv2.jpg/v1/fill/w_441,h_440,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Series%20A-25.jpg", 
                     sold=True),
            Painting(title="Sleeping Giants", 
                     materials="Mixed Media on Canvas", 
                     width=48, 
                     height=60, 
                     price="contact for price", 
                     fullsize="https://previews.dropbox.com/p/thumb/ACJX4NZfMkhKk9cDZH9jjNMzA5Jbf4083VAMyzmnMMm4NjIlQ7Ui8fko-yp7s2kB1OcXmZCnL_Xm_zicxHnKTK_WRlQ6IQ1NDQ-kmypZvb5oxChVcJ8mjder-NvmGuZJyykxSjxNtpDrxk-c-URoX7p0pS7WuWpDTSke_HUiLTP6E-eGxKJK212q1rjBWUf5K8kzx5uqPz0JJjjfIBRP70MAq8nCnB-9BpbG2RB4paMY4F663ydwRjGwmUIBymuiZ2kiNq9gxmpN-Rgg1W_07NqObc5bfxskO-lNpHzbJxlIs5JTQqytMVyh2LCNItH_UKYe-zYAwrcH5Q7BNLITnAl4e1yfuakZut6PlFrrAtj0ZLvw1XLrAieBQJgJt8XhyinlEhKclcGXqpZ0wHmYh64MKjVq8-m2ZzbwzeSuFnJamyB49oH1_-2w-_GMHPc7K-TWRdCrO5ycCM0asGPou_kJWCZ8yyNhl8WtOmZL8exE9aQlWJmU3bNpAXQYjR2GcBcC1b41PsyLHWicbeMZqO9_YMTXisdehMe7rCwPiPGrArrpDgUOP_Lfy302g7X4Knw/p.jpeg", 
                     image="https://static.wixstatic.com/media/1d469b_6e0969959277475b9f075c02bdb82d5e~mv2.jpg/v1/fill/w_344,h_440,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Series%20A-27.jpg", 
                     sold=True),
            Painting(title="Interplanetary", 
                     materials="Mixed Media on Canvas", 
                     width=36, 
                     height=36, 
                     price="contact for price", 
                     fullsize="https://previews.dropbox.com/p/thumb/ACIwP6dnWoZMDoKlg4xDTb5gh68Mz3jFAYdHbUS4h8QjEOU8TtVi6bOrJl7civoraP-zx-N1GUom_JFzIKntadfXo7I_OE8TnUBuHb294lhpmRlr7xpcAvcY7N_HjoIfeP4oXacfL1EaWWtuLmLmSPR7TM8VesvxeN3SqJ4pgbi8v9HE9MMxfCgVH8zb4o9toOiYyuacmvJUjyEB0KU_oyWRG0RyLoypQiolrpU-XX6tqkBAFbC16IQrpo9b0wVx1iJjIcuRkCsA-I0lrgMdgXSHecWnPRBRZvWZcBDtRSbKWuWUQfaLycA5sLJTw-wo0uKYuAArhPPKk1fI4rBBTOzu6KIPxwoaUYC3sX-uYAY0ck8PjoMY2KBMV1mVr4NODol7DCuzY-S8bgPb6kh6Mez_WVVa5q3UxfPVvsNyL-pZI4CBcbnq9jqF3jsa7Wu1CQIPbMGSmsnTz3IoR8B8rBxf/p.jpeg", 
                     image="https://static.wixstatic.com/media/1d469b_7ab7a3fe0fc94d5fb684de05d7ff3948~mv2.jpg/v1/fill/w_439,h_440,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Series%20A-28.jpg", 
                     sold=True),
            Painting(title="Butterfly", 
                     materials="Mixed Media on Canvas", 
                     width=36, 
                     height=36, 
                     price="contact for price", 
                     fullsize="https://previews.dropbox.com/p/thumb/ACIGVyMiTY9GdUwFakyehYiIB7xnD-rSQxlOqPK4ptYvgxahoLIWQpCMeq1MuaGW6nvhk-9o15gCv5PY6ZjFfeJDZf71jOLY2Ct4BcUsx5ka1GBIIMETaTTW8dZ92BF87hD4eSDIZku2WtfYy1K0eM6nPpk_rNhwoL6ShUhHtu48p1x5tKmspDHLdubv0mPy3HVMZ8zfYlTfQcegEeonu_zOPN-_HKxHS6GtjLGsAAuPlow5jwZvJf1tmZNBztiw4ATNFLMpe0wDk4wIYVYv4HuToDhdpcoBYqb8O5mw4Dt3GK6S9XKYJ4IQ_Y4To4E-ZYe3BxUM30YXbfrpYab2ijCdw6-sWOClcvDBKr-9DHtLwbbJlZYKY5KlMt1b_JO5GEtmRHizIFvNw5mWFJ3FF8NR7xiic7fTiVR3Bi4zmT3TvcA589lhs50ic4F-hKiJHjdf2MuMi_dhW-8WM4HikdHA/p.jpeg", 
                     image="https://static.wixstatic.com/media/1d469b_c77d79de1819431ab52708f005c67560~mv2.jpg/v1/fill/w_438,h_440,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Butterfly.jpg", 
                     sold=False),
            Painting(title="Volcano", 
                     materials="Mixed Media on Canvas", 
                     width=30, 
                     height=48, 
                     price="contact for price", 
                     fullsize="https://previews.dropbox.com/p/thumb/ACJfV0t9vcTKor5vbmhqvf-ARsVTDUkSdLOc7oVmycOkFiqNJTDJ9_lhMjPXGptybo3f5gNRs7Y-aGspp8dvqCNn_U8y482DZao71Cy_W6y0sCALdaS2I5A70zaNHcJY2uggRXntzbQdDy8sLINcbHODW7yuePwhLaA-6H5qldcqwmtNZfiP7q7jP4JVDY98A5OMImqW7KRZGQcatkx3irxtyhQwAwRIH-BUZ5TmRSMzH3O_LmZQ83EEwcsRrI3SBGPfmi6h2C1rdKTfzYxDWJPBgp4ZrSS2WMUrG1kRBf7QOnpR2MkRWeyw1dDM6ZfYKpwSp6TDR0YugXdSzkXbMQ1l/p.jpeg", 
                     image="https://static.wixstatic.com/media/1d469b_aaa775c24f14420e925e9086a0c685a9~mv2.jpg/v1/fill/w_275,h_440,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Series%20A-37.jpg", 
                     sold=True),
            Painting(title="Sol System", 
                     materials="Mixed Media on Canvas", 
                     width=48, 
                     height=43, 
                     price="contact for price", 
                     fullsize="https://previews.dropbox.com/p/thumb/ACKVtoXEALgBpaDiqC3d9cCJZxQ8hEajstQHQyWGfmVZGZRAEmC9-vGtGeYfE0hovjRabdQjz-Pj0hr-xWbuSATXak8VXsgyFvdRKPcT4aWrAYAhDIW0rBR9l-Eba700ARbxTFBOsHEKwlaQMAIsRYN-Nr1wrUhAi0Vb-RRs4m0aBoJ_xnIL_YH-fgQMj-JxcftgqsmV60RdFk0BXJKgxb5GXF34oGNl0s1X5DohFrMymqRS19x3BrM5kOeS0RfyGfzou9FluouqMJPul9DlDkY8s0p5a-w6_lLuZFZ8m3NPhPPFHKB7_qgf5pIRhPLDjtFcKMtgQtHWIAIqrxVgvcHNICysSnZdhWVW2UA72PFaaMRDlfyT14tPRYt2U5gdKIQ0602vfCrLKy5-nW84X0gYNuPPstcaUDbfPhwBiVDCycTs69bSP_G70sDMUFmPSfCJko4ShxSKMUm7YvXKbryF/p.jpeg", 
                     image="https://static.wixstatic.com/media/1d469b_42b0f1a68623472a8e6a9ef51f1b057c~mv2.jpg/v1/fill/w_491,h_440,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Series%20A-33.jpg", 
                     sold=True),
            Painting(title="Sun Scene I", 
                     materials="Mixed Media on Canvas", 
                     width=36, 
                     height=48, 
                     price="contact for price", 
                     fullsize="https://previews.dropbox.com/p/thumb/ACIlY88PHXr05EVfiy8Qhcth1hhhzgJZ1k8QFiFMlU2bmS_nT8hgT4gtnjjkcU67fcVLnb_j5JtIQ7mz-MTp4t3oxSYiln7IAu7fs8cRXFr02TJivC7vje7GRbt8h5rqNRWwM6fAbedAdxArG5MATRi0zubcixSRzGYIQF3ff9n14bGwmiTqt0c6gSLLZlgWkYNsinYYH3PByhUGik1nPmPmasUXWnrxo-IWY65btFXSWSBibtJKdckJSD_DnmfChG0VHQ8JSu8KNtoBPZJLiHFo7s0XOGumjB9dWvCmQfegqQtNIvqymAoXMmoCeBx6UX-D5-niNauICc--N530D6L3pVcxrIIu5ngV0niTg0qQ5UF-S1UFzYBt1NRiNJIQex5qtcGoZ5yIrW9S-_wTmfrj/p.jpeg", 
                     image="https://static.wixstatic.com/media/1d469b_57d029fd43ad49b5acba4d427b1de9c0~mv2.jpg/v1/fill/w_328,h_440,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Series%20A-38.jpg", 
                     sold=False),
            Painting(title="Sun Scene II", 
                     materials="Mixed Media on Canvas", 
                     width=36, 
                     height=48, 
                     price="contact for price", 
                     fullsize="https://previews.dropbox.com/p/thumb/ACKQwdLnQS-BNr79GUFW2EdbTeW-nq4LQYAWehrBkyALZx3mHdEjfik7mTdI4wd4szZXjdGwh4BD6N5ufHP1rIb1_jI03SWRqY81IgoW2WraktwOnEUuBD003SHhzy_ebumQRPDGtPTv7xDZFS66vPL63Qvh1hPhoZdSg6fnaZUtqZL09wZNkttrd-GcL6yRHRszBtbdiXZJKydX7YYoQ2Q7BMYe7AjbBQZ9BlHtzV9-is3916_UC9dG-rQYX7lLtq8RFHYFxOljOE7gZtnLFLmZf7kXSJKus9xq5uJbCGPHothxrF07bnfYobJ6Co9YdhIkkWTn1k3yKJuq2s4mxj28e-8_3dwBf4RA3hknMt9nbJsl0ROCzG7g0qj4Md8435e1jdD2Mfi76gE0PzEjaWsv-iGbHoynS3KsTJVkI-_AWQLo1RxfYbZOvBzlf8ld_RugGKpAZsHRfoQSu2FBcVj9/p.jpeg", 
                     image="https://static.wixstatic.com/media/1d469b_858ae03bceb04012ab3f117d7b2499ab~mv2.jpg/v1/fill/w_329,h_440,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Sun%20Scene%20II.jpg", 
                     sold=False),
            Painting(title="Windows", 
                     materials="Mixed Media on Canvas", 
                     width=36, 
                     height=48, 
                     price="contact for price", 
                     fullsize="https://previews.dropbox.com/p/thumb/ACLGCXxZOPe_wjy4PgXKfwJlmnmhwvyNW4GQ0wikwLhWBIUmuQJbMa0wr_lvt-7TxRH_MD11KjL1Zwe_dn9XtFzy7qFrT3DVlW-AsADE-ccQoNISYMOnaroFut9N39j1odjuHwYDV9rknaiuxegdzNZyTO_uWxwYIumo4nE3JqPSg9izqqFgzVl96KYroR9w7E1XZakEdASvLHYN9KtXfkgxHMpdannwyQ78kV-FvK9VFDqbMFFVKPwlKakN3DUuDND3uTk8Sktehj5XKADuFQJ8jechBN5L1df-5hIYKAa6FC3et3i4VbL1Ln066zu14gQY4LDz_13XMl-K5OE4hA0C6hhhdEoOSue-gN8FzgYVXRn-MJQ_70QWa-TLzs3iuALwUKk1HErpcGCrWveEgxx3/p.jpeg", 
                     image="https://static.wixstatic.com/media/1d469b_51aab7836d6e4315ac3f01b31117cd88~mv2.jpg/v1/fill/w_328,h_440,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Series%20A-35.jpg", 
                     sold=False)
        ]

        db.session.add_all(paintings)
        
        print("Seeding posts")
        posts = [
            Post(title="My first post", 
                 content=fake.text(), 
                 image_url="./images/YASI_PAINTINGS_WEB-3.jpg", 
                 date_added=datetime.datetime.now()
                 ),
            Post(title="My second post", 
                 content=fake.text(), 
                 image_url="./images/slider-4.jpg", 
                 date_added=datetime.datetime.now()
                 ),
            Post(title="My third post", 
                 content=fake.text(), 
                 image_url="./images/slider-3.jpg", 
                 date_added=datetime.datetime.now()
                 )
        ]
        
        db.session.add_all(posts)

        print("Seeding events")
        events = [
            Event(name="Dream Gallery",
                  venue="Illuminate Collective",
                  location="1714 N. Mascher St, Philadelphia, PA",
                  details="!Special Announcement Coming in Hot! Excited to announce our road to lucid dream festival “Dream Gallery” first Friday weekend event! We will be featuring artists involved with lucid dream festival directly supporting and from the Philadelphia area! Come check out so amazing art installations and a special interactive gallery show with special musical guests followed by a intimate music show on Saturday featuring some of Philadelphia's staples in the dance music community!",
                  image_url = "./images/illuminate-1.jpeg",
                  event_date="March 1st, 2024",
                  event_link="https://www.instagram.com/illuminate_collective_phl/"
            ),
            Event(name="Dream Gallery 2",
                  venue="Illuminate Collective",
                  location="1714 N. Mascher St, Philadelphia, PA",
                  details="!Special Announcement Coming in Hot! Excited to announce our road to lucid dream festival “Dream Gallery” first Friday weekend event! We will be featuring artists involved with lucid dream festival directly supporting and from the Philadelphia area! Come check out so amazing art installations and a special interactive gallery show with special musical guests followed by a intimate music show on Saturday featuring some of Philadelphia's staples in the dance music community!",
                  image_url = "./images/illuminate-2.jpeg",
                  event_date="March 2nd, 2024",
                  event_link="https://www.instagram.com/illuminate_collective_phl/"
            )
        ]
        
        db.session.add_all(events)
        
        db.session.commit()

        print("Done seeding.")