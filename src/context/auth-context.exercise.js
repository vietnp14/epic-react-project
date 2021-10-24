/** @jsx jsx */
import {jsx} from '@emotion/core'

import React, { useEffect, useCallback, useMemo, useContext } from 'react'
import * as auth from 'auth-provider'
import {client} from 'utils/api-client'
import {useAsync} from 'utils/hooks'
import {FullPageSpinner, FullPageErrorFallback} from 'components/lib'
import { queryCache } from 'react-query'
import { setQueryDataForBook } from 'utils/books'

async function getUser() {
  const token = await auth.getToken();

  if (token) {
    const { user, listItems } = await client('bootstrap', {token});
    queryCache.setQueryData('list-items', listItems);

    for(const listItem of listItems) {
      setQueryDataForBook(listItem.book);
    };

    return user;
  }

  return null;
}

const userPromise = getUser();

const AuthContext = React.createContext()
AuthContext.displayName = 'AuthContext'

function AuthProvider(props) {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
    status,
  } = useAsync();

  useEffect(() => {
    run(userPromise);
  }, [run])

  const login = useCallback(
    form => auth.login(form).then(user => setData(user)),
    [setData],
  )
  const register = useCallback(
    form => auth.register(form).then(user => setData(user)),
    [setData],
  )
  const logout = useCallback(() => {
    auth.logout()
    setData(null)
  }, [setData])

  const value = useMemo(() => ({user, login, logout, register}), [
    login,
    logout,
    register,
    user,
  ])

  if (isLoading || isIdle) {
    return <FullPageSpinner />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  if (isSuccess) {
    return <AuthContext.Provider value={value} {...props} />
  }

  throw new Error(`Unhandled status: ${status}`)
}

function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}

function useClient() {
  const {
    user: {token},
  } = useAuth()
  return useCallback(
    (endpoint, config) => client(endpoint, {...config, token}),
    [token],
  )
}

export {AuthProvider, useAuth, useClient}
