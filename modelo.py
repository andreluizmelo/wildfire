import pandas as pd
from sklearn import tree

import pickle

data = pd.read_csv('data.csv')

data.drop(columns=['datetime', 'unix'],inplace=True)

print(data.head())

def has_fire(row):
    if row['events'] == 0:
        return 0
    elif row['events'] <= 5:
        return 1
    else:
        return 2

data['has_fire'] = data.apply (lambda row: has_fire (row),axis=1)

x = data.drop(columns=['events','has_fire'])
y = data['has_fire']

pickle.dump( trees.fit(x,y), open( "model", "wb" ))