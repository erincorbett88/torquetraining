import {describe, test, expect} from 'vitest'
import {AppProvider, useAppContext} from './AppContext.tsx'
import fetchMock from 'fetch-mock'
import {render, act} from '@testing-library/react'
import {mockMembers, mockTeams} from "../__mocks__/mockData.ts";


describe('when the AppContext', () => {
    test('it makes a GET request to fetch teams and members', async () => {
        fetchMock.getOnce('http://localhost:8080/api/teams', mockTeams)
        fetchMock.getOnce('http://localhost:8080/api/members', mockMembers)

        const TestComponent = () => {
            const {members, teams} = useAppContext();
            return (
                <div>
                    <p>Teams: {members.length}</p>
                    <p>Members: {teams.length}</p>
                </div>
            );
        }

        let container: HTMLElement | null;
        await act(async () => {
            const result = render(
                <AppProvider>
                    <TestComponent/>
                </AppProvider>
            )
            container = result.container;

            if (container) {
                expect(container!.textContent).toContain('Teams: 2');
                expect(container!.textContent).toContain('Members: 2');
            }
        });

        fetchMock.restore()


    })
})