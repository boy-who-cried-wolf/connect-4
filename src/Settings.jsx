import './settings.css'
export default function Settings({ settings, setSettings }){
    return(
        <>
        <h2>Settings</h2>
        <div className="settings">
            <div>
                <label htmlFor="computer">Computer</label>
                <select name="player" id="computer"
                value={ settings.player }
                onChange={e => { setSettings({ ...settings, player: e.target.value })}}
                >
                    <option value="1">player 1</option>
                    <option value="2">player 2</option>
                </select>
            </div>
            <div>
                <label htmlFor="k">K: { settings.k }</label>
                <input type='range' value={ settings.k } min={1} max={10} id="k"
                onChange={e => { setSettings({ ...settings, k: e.target.value })}}
                />
            </div>
            <div>
                <button className= {settings.pronning ? "active" : "inactive"}
                type="button"
                onClick={() => { setSettings({ ...settings, pronning: !settings.pronning })}}>
                    Pronning
                </button>
            </div>
        </div>
        </>
    )
}