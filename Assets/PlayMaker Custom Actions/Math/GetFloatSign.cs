// (c) Copyright HutongGames, LLC 2010-2017. All rights reserved.

using UnityEngine;

namespace HutongGames.PlayMaker.Actions
{
	[ActionCategory(ActionCategory.Math)]
	[Tooltip("Gets the sign value of a float")]
	public class GetFloatSign : FsmStateAction
	{
		[RequiredField]
		[UIHint(UIHint.Variable)]
		[Tooltip("The float variable to test.")]
		public FsmFloat floatValue;

		[Tooltip("The Sign of the float value")]
		public FsmFloat sign;

		[Tooltip("Repeat every frame. Useful if the variable is changing and you're waiting for a particular result.")]
		public bool everyFrame;

		public override void Reset()
		{
			floatValue = 0f;
			sign = null;
			everyFrame = false;
		}

		public override void OnEnter()
		{
			DoSignTest();

			if (!everyFrame)
			{
				Finish();
			}
		}

		public override void OnUpdate()
		{
			DoSignTest();
		}

		void DoSignTest()
		{
			if (floatValue == null)
			{
				return;
			}
			sign.Value = Mathf.Sign (floatValue.Value);
		}

	}
}