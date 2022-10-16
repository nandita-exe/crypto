import pandas as pd
from fbprophet import Prophet
import yfinance as yf
import streamlit as st
import datetime
from datetime import date, timedelta
import plotly.graph_objects as go
from yahooquery import Screener

st.set_page_config(layout="wide")
hide_menu_style = """
        <style>
        #MainMenu {visibility: hidden;}
        footer{visibility: hidden;}
        </style>
        """
st.markdown(hide_menu_style, unsafe_allow_html=True)

# st.markdown('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">', unsafe_allow_html=True)
# with open('style.css') as f:
#     st.markdown(f'<style>{f.read()}</style>', unsafe_allow_html=True)

# with open('navbar.html') as n:
#     st.markdown(n.read(), unsafe_allow_html=True)

# st.markdown("""
# <script
# src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
# integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
# crossorigin="anonymous"></script>
# """, unsafe_allow_html=True)
today = date.today()

d1 = today.strftime("%Y-%m-%d")
end_date = d1
d2 = date.today() - timedelta(days=730)
d2 = d2.strftime("%Y-%m-%d")
start_date = d2
# with open('style.css') as f:
#     st.markdown(f'<style>{f.read()}</style>', unsafe_allow_html=True)


st.title("CRYPTOCURRENCY PREDICTION")

# df = pd.read_csv('BTC-USD.csv')
# df = pd.read_csv(data)
s = Screener()
data2 = s.get_screeners('all_cryptocurrencies_us', count=250)

# data is in the quotes key
dicts=data2['all_cryptocurrencies_us']['quotes']
symbols = [d['symbol'] for d in dicts]
# symbols
with st.form(key='my_form'):
  user_input=st.selectbox('Enter coin symbol: ', symbols[:30])
  # user_input=st.text_input("Enter coin name: ", 'BTC-USD')
  coin_name=user_input.upper()
  # period=int(input('Enter number of days: '))
  period=st.slider(label='Enter number of days:', min_value=1, max_value=7, key=3)

  # period=st.number_input("Enter number of days", 10)
  submit_button = st.form_submit_button(label='Submit')
# if submit:
period=int(period)
data = yf.download(coin_name, 
                        start=start_date, 
                        end=end_date, 
                        progress=False)
data["Date"] = data.index
data = data[["Date", "Open", "High", "Low", "Close", "Adj Close", "Volume"]]
data.reset_index(drop=True, inplace=True)
  # print(data.head())
df = data[["Date", "Close"]]
df.columns = ["ds", "y"]
  # print(df)
prophet = Prophet()
prophet.fit(df)
future = prophet.make_future_dataframe(periods=period)
  # print(future)

figure1 = go.Figure(data=[go.Candlestick(x=data["Date"],
                                          open=data["Open"], 
                                          high=data["High"],
                                          low=data["Low"], 
                                          close=data["Close"])])
figure1.update_layout(title = coin_name+" Price Analysis", 
                      xaxis_rangeslider_visible=True)
  # figure.show()
forecast = prophet.predict(future)
  # forecast[["ds", "yhat", "yhat_lower", "yhat_upper"]].tail(30)
forecast1 = forecast[["ds","trend", "yhat", "yhat_lower", "yhat_upper"]].tail(period)

figure = go.Figure()
figure.add_trace(go.Scatter(x=forecast["ds"],y=forecast["yhat"],name='yhat'))
figure.add_trace(go.Scatter(x=forecast["ds"],y=forecast["yhat_lower"],name='yhat_lower'))
figure.add_trace(go.Scatter(x=forecast["ds"],y=forecast["yhat_upper"],name='yhat_upper'))
  # figure.add_trace(go.Scatter(x=forecast["ds"],y=forecast["trend"]))
figure.update_layout(title = coin_name+" Price Analysis and Prediction", 
                      xaxis_rangeslider_visible=True)

  # figure.show()

  # st.write(df.describe())
# st.write("Data for last 15 days")
# st.dataframe(df.tail(15))
# st.plotly_chart(figure1, use_container_width=True)
st.write("Forecast for next "+str(period)+" days")
# st.dataframe(forecast.tail(period))

st.dataframe(forecast1.tail(period))
st.plotly_chart(figure, use_container_width=True)

# with open('footer.html') as a:
#     st.markdown(a.read(), unsafe_allow_html=True)

from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
r2_score(df.y, df.yhat)
print(r2_score)
st.write("score", r2_score)
