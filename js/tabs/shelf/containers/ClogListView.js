import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import ClogListView from '../../../common/ClogListView';
import {fragments} from '../../../models/clog';
import {colors} from '../../../common/styles';

import NavBar from '../components/NavBar';

const query = gql`
  query ClogListView($option: QueryClogOption){
    clogs(option: $option) {
      ...clogMetaData
      createdAt
    }
  }
  ${fragments.clogMetaData}
`;

class Container extends React.Component {
  render() {
    return (<View style={{
      flex: 1,
      backgroundColor: colors.greyBackground
    }}>
      <NavBar backButton onBackPress={() => this.props.navigator.pop()} title={this.props.title} containerStyle={styles.navBar} titleTextStyle={styles.titleText}/>
      <ClogListView clogs={this.props.clogs}/>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: 'rgb(0, 150, 253)'
  },
  titleText: {
    color: 'white'
  }
});

export const mapPropsToOptions = ({category, tag, sortBy}) => ({
  variables: {
    option: {
      category,
      tag,
      sortBy
    }
  }
});

const mapQueryToProps = ({ ownProps, data }) => {
  const {loading, clogs} = data;
  return {
    clogs: loading ? [] : clogs
  };
};

export default graphql(query, {
  props: mapQueryToProps,
  options: mapPropsToOptions
})(Container);